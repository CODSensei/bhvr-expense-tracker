// app.ts
import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";

// this is out main app
const app = new Hono();
app.use("*", logger());

// sub-app will be mounted on this route
const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type apiRoutes = typeof apiRoutes;
