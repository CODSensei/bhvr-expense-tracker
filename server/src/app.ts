// server/src/app.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { expensesRoutes } from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono();
app.use("*", logger(), cors(), prettyJSON());

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoutes);

app.use("*", serveStatic({ root: "./static" }));
app.get("*", serveStatic({ path: "./static/index.html" }));
export type ApiRoutes = typeof apiRoutes;
export default app;
