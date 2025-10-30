import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/expenses")({
  component: Expenses,
});
const fetchAllExpenses = async () => {
  const response = await api.expenses.$get();
  if (!response.ok) throw new Error("server error!!");
  const data: any = await response.json();
  return data;
};

function Expenses() {
  const { isPending, data, error } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: fetchAllExpenses,
  });

  if (error) return "An error has occurred: " + error.message;
  // console.log("Expenses: ", data);

  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of all you expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Expense</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-4 " />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 " />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 " />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map((expense: any) => {
                return (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium text-white">
                      {expense.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {expense.title}
                    </TableCell>
                    <TableCell className="font-medium">
                      {expense.amount}
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </div>
  );
}
