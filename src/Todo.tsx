import { FaCheck, FaTrash } from "react-icons/fa";
import { Button } from "./components/ui/button";
import type { TodoItem } from "./hooks/useIndexedTodos";

interface TodoProp {
  todo: TodoItem;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  showComplete?: boolean;
}

export default function Todo({
  todo,
  completeTodo,
  deleteTodo,
  showComplete = true,
}: TodoProp) {
  return (
    <div className="bg-blue-900/50 p-2 rounded-md flex gap-4 items-center text-white">
      <p
        className={`flex-1 overflow-warp: wrap-anywhere ${
          todo.completed ? "line-through text-slate-400" : ""
        }`}
      >
        {todo.text}
      </p>

      <div className="flex gap-2">
        {showComplete && (
          <Button
            onClick={() => completeTodo(todo.id)}
            className="rounded-full bg-neutral-800 hover:bg-emerald-600 dark:hover:bg-emerald-600"
            size="icon"
            variant="ghost"
          >
            <FaCheck className="size-3" />
          </Button>
        )}
        <Button
          onClick={() => deleteTodo(todo.id)}
          className="rounded-full bg-neutral-800 hover:bg-red-600 dark:hover:bg-red-600"
          size="icon"
          variant="ghost"
        >
          <FaTrash className="size-3" />
        </Button>
      </div>
    </div>
  );
}
