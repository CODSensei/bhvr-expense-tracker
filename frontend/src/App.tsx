import { useState } from "react";
import { Button } from "./components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col bg-background max-w-md m-auto gap-y-5">
        <Button onClick={() => setCount((count) => count + 1)}>UP</Button>
        <Button onClick={() => setCount((count) => count - 1)}>DOWN</Button>
        <p>{count}</p>
      </div>
    </>
  );
}

export default App;
