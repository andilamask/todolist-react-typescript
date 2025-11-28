import Todo from "../Todo";
import { useTodosRouteContext } from "../hooks/useTodosRouteContext";

export default function CompletedPage() {
  const { todos, isLoading, toggleTodo, deleteTodo } = useTodosRouteContext();

  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <h2 className="text-center text-white text-xl">Completed</h2>

      {isLoading ? (
        <p className="text-center text-white mt-4">Loading todos...</p>
      ) : completedTodos.length > 0 ? (
        completedTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            completeTodo={toggleTodo}
            deleteTodo={deleteTodo}
            showComplete={false}
          />
        ))
      ) : (
        <p className="mt-4 text-center text-slate-300 text-lg">
          No completed tasks yet.
        </p>
      )}
    </div>
  );
}
