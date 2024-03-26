import { Hono } from "hono";
import { handle } from "hono/vercel";
import { kv } from "@vercel/kv";

export const runtime = "edge";

const app = new Hono();

app.get("/:key", async (c) => {
  const { key } = c.req.param();

  const url: string | null = await kv.get(key);

  if (url) {
    return c.redirect(url)
  }

  return c.redirect("/404");
});

export const GET = handle(app);
