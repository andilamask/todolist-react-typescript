import { useState } from "react";
// import "./App.css";
import Todo from "./Todo";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useIndexedTodos } from "./hooks/useIndexedTodos";

export default function App() {
  const [input, setInput] = useState<string>("");
  const { todos, isLoading, addTodo, toggleTodo, deleteTodo } =
    useIndexedTodos();

  const handleAddTodo = () => {
    const Trimmed = input.trim(); // trim() untuk menghilangkan spasi di awal/akhir
    if (!Trimmed) return;
    addTodo(Trimmed);
    setInput(""); // mengosongkan input
  };

  return (
    <>
      <div className="bg-purple-950 p-2 min-h-screen flex justify-center items-center">
        <div className="max-w-[500px] w-[90%] bg-slate-900 p-4 rounded-md shadow-md">
          <h1 className="text-center text-white text-2xl">
            To do List Andila 🌸
          </h1>

          {/* bagian Input dan Button */}

          <div className="flex gap-2 justify-center items-center my-8">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add to do ..."
              className="h-11 text-lg"
            ></Input>
            <Button
              onClick={handleAddTodo}
              variant="destructive"
              size={"lg"}
              className="text-1xl"
            >
              Add to do
            </Button>
          </div>

          {/* Bagian list todos} */}

          <div>
            <h1 className="text-center text-white text-2xl">Todos</h1>
            {isLoading ? (
              <p className="text-center text-white mt-4">Loading todos...</p>
            ) : todos.length > 0 ? (
              todos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  completeTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))
            ) : (
              <h1 className="mt-4 text-center text-emerald-500/80 text-lg">
                You have completed all your tasks!
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
