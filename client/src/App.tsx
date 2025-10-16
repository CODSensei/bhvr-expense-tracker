import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchTotal = async () => {
  const response = await api.expenses["total-spent"].$get();
  if (!response.ok) throw new Error("server error!!");
  const data = await response.json();
  return data;
};

function App() {
  const { isPending, data, error } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: fetchTotal,
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <Card className="w-sm m-auto">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total amount you have spent</CardDescription>
        <CardAction></CardAction>
      </CardHeader>
      <CardContent>{isPending ? "..." : data.total}</CardContent>
    </Card>
  );
}

export default App;
