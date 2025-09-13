import { Hono } from "hono";

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

export const expensesRoutes = new Hono()

  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })

  .post("/", async (c) => {
    const expense = await c.req.json();
    console.log({ expense });
    return c.json({ expense });
  });
