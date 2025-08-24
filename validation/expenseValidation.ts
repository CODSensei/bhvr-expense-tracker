import z from "zod";

export const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string(),
  amount: z.number().int().positive(),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });
