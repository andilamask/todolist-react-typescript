import { useState } from "react";
// import "./App.css";
import Todo from "./Todo";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInput("");
  };

  const completeTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="bg-purple-950 p-2 min-h-screen flex justify-center items-center">
        <div className="max-w-[500px] w-[90%] bg-slate-900 p-4 rounded-md shadow-md">
          <h1 className="text-center text-white text-2xl">
            To do List Andila 🌸
          </h1>
          <div className="flex gap-2 justify-center items-center my-8">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add to do ..."
              className="h-11 text-lg"
            ></Input>
            <Button
              onClick={addTodo}
              variant="destructive"
              size={"lg"}
              className="text-1xl"
            >
              Add to do
            </Button>
          </div>
          <div>
            <h1 className="text-center text-white text-2xl">Todos</h1>
            {todos.length > 0 ? (
              <>
                {todos.map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                    />
                  );
                })}
              </>
            ) : (
              <h1 className="mt-4 text-center text-white text-lg">
                You have completed all your tasks
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
