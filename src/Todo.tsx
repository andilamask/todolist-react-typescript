// import React from "react";
// import { FaCheckCircle, FaTrash } from "react-icons/fa";
// import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback } from "./components/ui/avatar";

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
    <div className="bg-blue-900/50 p-2 rounded-md flex justify-between items-center my-4 text-white">
      <p className={`${todo.completed === true ? "line-through" : ""}`}>
        {todo.text}
      </p>
      <div className="flex items-center gap-2 cursor-pointer">
        {/* <FaCheckCircle
          className="hover:text-green-200"
          onClick={() => completeTodo(todo.id)}
        />
        <FaTrash
          className="hover:text-red-200"
          onClick={() => deleteTodo(todo.id)}
        /> */}
        <Avatar onClick={() => completeTodo(todo.id)}>
          <AvatarFallback className="bg-green-600 text-white hover:bg-green-500 transition">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </AvatarFallback>
        </Avatar>
        <Avatar onClick={() => deleteTodo(todo.id)}>
          <AvatarFallback className="bg-red-600 text-white hover:bg-red-500 transition">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
