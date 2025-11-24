import React from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

interface TodoProp {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };

  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function Todo({ todo, completeTodo, deleteTodo }: TodoProp) {
  return (
    <div className="bg-purple-800 p-2 rounded-md flex justify-between items-center my-4 text-white">
      <p className={`${todo.completed === true ? "line-through" : ""}`}>
        {todo.text}
      </p>
      <div className="flex items-center gap-2 cursor-pointer">
        <FaCheckCircle
          className="hover:text-green-200"
          onClick={() => completeTodo(todo.id)}
        />
        <FaTrash
          className="hover:text-red-200"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
    </div>
  );
}
