import { NavLink, Outlet } from "react-router-dom";
import { useIndexedTodos } from "./hooks/useIndexedTodos";

export type TodosContextType = ReturnType<typeof useIndexedTodos>;

export default function App() {
  const todosState = useIndexedTodos();
  const { todos } = todosState;

  const incompleteCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="bg-purple-950 min-h-screen flex justify-center items-center">
      <div className="max-w-[500px] w-[90%] bg-slate-900 p-4 rounded-md shadow-md">
        <h1 className="text-center text-white text-2xl mb-4">
          To do List Andila BARUUU LAGIIII v7777-11111111111111-2222222222222-33333333-444-555🌸
        </h1>

        {/* Navbar */}
        <div className="flex justify-center gap-4 mb-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-1 rounded-full text-sm ${
                isActive
                  ? "bg-emerald-500 text-slate-900"
                  : "bg-slate-800 text-slate-100"
              }`
            }
          >
            Home ({incompleteCount})
          </NavLink>

          <NavLink
            to="/completed"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full text-sm ${
                isActive
                  ? "bg-emerald-500 text-slate-900"
                  : "bg-slate-800 text-slate-100"
              }`
            }
          >
            Completed ({completedCount})
          </NavLink>
        </div>

        {/* Outlet: di sini halaman Home / Completed akan dirender */}
        <Outlet context={todosState} />
      </div>
    </div>
  );
}
