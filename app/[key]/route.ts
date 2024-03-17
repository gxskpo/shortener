import { Hono } from "hono";
import { handle } from "hono/vercel";
import { sql } from "@vercel/postgres";
import type { Urls } from "@/types/urls";

export const runtime = "edge";

const app = new Hono();

app.get("/:key", async (c) => {
  const { key } = c.req.param();

  const { rows } = await sql<Urls>`SELECT * FROM urls WHERE key = ${key}`;

  if (rows.length > 0) {
    return c.redirect(rows[0].originalurl);
  }

  return c.redirect("/404");
});

export const GET = handle(app);

/* import { sql } from "@vercel/postgres";
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
 */
