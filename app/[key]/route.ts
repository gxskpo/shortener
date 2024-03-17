import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export async function GET(
  request: Request,
  { params }: { params: { key: string } },
) {
  const key = params.key.toLowerCase();
  const client = await sql.connect();
  const { rows } = await client.query(
    `SELECT *
         FROM urls
         WHERE key = $1`,
    [key],
  );
  if (rows.length > 0) {
    return Response.redirect(rows[0].originalurl);
  }

  const urlObject = new URL(request.url);
  const redirTo = urlObject.origin + "/404"
  console.log(redirTo)
  return Response.redirect(redirTo);
}
