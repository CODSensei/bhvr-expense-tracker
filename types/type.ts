import type z from "zod";
import type { expenseSchema } from "../validation/expenseValidation";

export type Expense = z.infer<typeof expenseSchema>;
