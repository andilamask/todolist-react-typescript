// import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { Button } from "./components/ui/button";
// import { Avatar, AvatarFallback } from "./components/ui/avatar";

interface TodoProp {
  todo: { id: number; text: string; completed: boolean };
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function Todo({ todo, completeTodo, deleteTodo }: TodoProp) {
  return (
    <div className="bg-blue-900/50 p-2 rounded-md flex justify-between items-center my-4 text-white">
      <p
        className={`${
          todo.completed === true ? "line-through" : ""
        } flex-1 break-all`} // break-all supaya teks panjang bisa ke-wrap
      >
        {todo.text}
      </p>
      <div className="flex items-center gap-2 cursor-pointer">
        <Button
          onClick={() => completeTodo(todo.id)}
          className="rounded-full bg-neutral-800 hover:bg-green-600 dark:hover:bg-green-600"
          size={"icon"}
          variant="ghost"
        >
          <FaCheck onClick={() => completeTodo(todo.id)} className="size-3" />
        </Button>
        <Button
          onClick={() => deleteTodo(todo.id)}
          className="rounded-full bg-neutral-800 hover:bg-red-600 dark:hover:bg-red-600" // rounded supaya bulat
          size={"icon"}
          variant="ghost"
        >
          <FaTrash onClick={() => deleteTodo(todo.id)} className="size-3" />
        </Button>
      </div>
    </div>
  );
}
