import { sql } from "@vercel/postgres";
/*
    Bun loads automatically .env.local, so we don't need to load it manually
*/
(async () => {
  await sql`CREATE TABLE IF NOT EXISTS urls (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    originalUrl TEXT NOT NULL
    );`;
})();
