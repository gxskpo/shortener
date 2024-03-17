"use server";
import { sql } from "@vercel/postgres";

function crc32(input: string): string {
  const table = new Uint32Array(256);
  const str = input.toLowerCase();

  // Precompute the CRC-32 table
  for (let i = 0; i < 256; i++) {
    let crc = i;
    for (let j = 0; j < 8; j++) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
    table[i] = crc >>> 0;
  }

  let crc = 0xffffffff;
  for (let i = 0; i < str.length; i++) {
    const byte = str.charCodeAt(i) & 0xff;
    crc = (crc >>> 8) ^ table[(crc ^ byte) & 0xff];
  }

  crc = (crc ^ 0xffffffff) >>> 0;
  return crc.toString(16).toUpperCase().padStart(8, "0");
}

export default async function newLink(url: string): Promise<string | null> {
  const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
  if (!regex.test(url)) {
    return null;
  }

  if (!url.trim().startsWith("http://") && !url.trim().startsWith("https://")) {
    url = "https://" + url.trim();
  }

  const hash = crc32(url).toLowerCase();
  const client = await sql.connect();
  const { rows } = await client.sql`SELECT *
                                    FROM urls
                                    WHERE key = ${hash}`;
  if (rows.length > 0) {
    return rows[0].key;
  }
  await client.sql`INSERT INTO urls(key, originalUrl)
                     values (${hash}, ${url})`;
  return hash;
}
