import { type FormEvent, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Todo from "../Todo";
import { useTodosRouteContext } from "../hooks/useTodosRouteContext";

export default function HomePage() {
  const [input, setInput] = useState("");
  const { todos, isLoading, addTodo, toggleTodo, deleteTodo } =
    useTodosRouteContext();

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    addTodo(trimmed);
    setInput("");
  };

  const incompleteTodos = todos.filter((t) => !t.completed);

  return (
    <div className="flex flex-col gap-4">
      {/* Form tambah todo */}
      <form onSubmit={handleAddTodo} className="flex gap-2 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add to do ..."
          className="h-11 text-lg"
        />
        <Button
          type="submit"
          variant="destructive"
          size="lg"
          className="text-1xl"
        >
          Add
        </Button>
      </form>

      {/* List todo belum selesai */}
      <div className="flex flex-col gap-2 mt-4">
        <h2 className="text-center text-white text-xl">Todos</h2>

        {isLoading ? (
          <p className="text-center text-white mt-4">Loading todos...</p>
        ) : incompleteTodos.length > 0 ? (
          incompleteTodos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              completeTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))
        ) : (
          <p className="mt-4 text-center text-emerald-500/80 text-lg">
            You have completed all your tasks! 🎉
          </p>
        )}
      </div>
    </div>
  );
}
