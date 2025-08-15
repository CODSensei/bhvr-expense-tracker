// app.ts
import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";

// this is out main app
const app = new Hono();
app.use("*", logger());

// a test route to see if server is working
app.get("/test", (c) => {
  return c.json({ message: "test" });
});

// sub-app will be mounted on this route
app.route("/api/expenses", expensesRoute);

export default app;
