// server/src/routes/expenses.ts
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createPostSchema, type Expense } from "@shared/types";

// dummy data
const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 1200 },
  { id: 2, title: "Electricity Bill", amount: 850 },
  { id: 3, title: "Internet Subscription", amount: 999 },
  { id: 4, title: "Gym Membership", amount: 1500 },
  { id: 5, title: "Coffee", amount: 250 },
];

// api routes of expenses
export const expensesRoutes = new Hono()

  .get("/", (c) => {
    c.status(200);
    return c.json({ expenses: fakeExpenses });
  })

  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses.push({ id: ++fakeExpenses.length, ...expense });
    c.status(201);
    return c.json({ expense });
  })

  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) return c.notFound();
    return c.json({ expense });
  })

  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) return c.notFound();
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ deletedExpense });
  });
