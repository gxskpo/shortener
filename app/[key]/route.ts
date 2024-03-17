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
