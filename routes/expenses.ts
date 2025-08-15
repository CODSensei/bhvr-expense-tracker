// routes/expenses.ts
import { Hono } from "hono";
import z from "zod";
import { zValidator } from "@hono/zod-validator";

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

// uses zod to validate if post request contain valid data
const createExpenseSchema = z.object({
  title: z.string(),
  amount: z.number().int().positive(),
});

// we created a sub-app which will be mounted on main app
export const expensesRoute = new Hono()
  .get("/", (c) => {
    // console.log("get: ", c);
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", async (c) => {
    // console.log("post: ", c);
    const request = await c.req.json();
    const expense = createExpenseSchema.parse(request);
    console.log({ expense });
    return c.json(expense);
  });
