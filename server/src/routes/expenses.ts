import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";

type Expense = {
  id: number;
  title: string;
  amount: number;
};

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 1200 },
  { id: 2, title: "Electricity Bill", amount: 850 },
  { id: 3, title: "Internet Subscription", amount: 999 },
  { id: 4, title: "Gym Membership", amount: 1500 },
  { id: 5, title: "Coffee", amount: 250 },
];

const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

export const expensesRoutes = new Hono()

  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })

  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses.push({ id: ++fakeExpenses.length, ...expense });
    return c.json({ expense });
  });
