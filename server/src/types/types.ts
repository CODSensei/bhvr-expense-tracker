import { z } from "zod";

// validation and types
export const ExpenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

export const createPostSchema = ExpenseSchema.omit({ id: true });
export type Expense = z.infer<typeof ExpenseSchema>;
