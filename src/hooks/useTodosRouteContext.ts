import { useOutletContext } from "react-router-dom";
import type { TodosContextType } from "../App";

export function useTodosRouteContext() {
  return useOutletContext<TodosContextType>();
}
