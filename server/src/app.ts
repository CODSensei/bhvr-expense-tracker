// server/src/app.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { expensesRoutes } from "./routes/expenses";

const app = new Hono();
app.use("*", logger(), cors(), prettyJSON());

app.route("/api/expenses", expensesRoutes);

export default app;
