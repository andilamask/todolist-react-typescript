import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTodos,
  addTodosService,
  toggleTodoService,
  deleteTodoService,
  type TodoItem,
} from "../services/todoService";

export type { TodoItem };

const TODOS_QUERY_KEY = ["todos"];

export function useIndexedTodos() {
  const queryClient = useQueryClient();

  // bagian "read" useQuery
  const {
    data: todos = [],
    isLoading,
    // isError, error, dll kalau perlu
  } = useQuery<TodoItem[]>({
    queryKey: TODOS_QUERY_KEY,
    queryFn: getTodos,
  });

  const invalidateTodos = () =>
    queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });

  const addTodoMutation = useMutation({
    mutationFn: (text: string) => addTodosService(text),
    onSuccess: invalidateTodos,
  });

  const toggleTodoMutation = useMutation({
    mutationFn: (id: number) => toggleTodoService(id),
    onSuccess: invalidateTodos,
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => deleteTodoService(id),
    onSuccess: invalidateTodos,
  });

  const addTodo = (text: string) => addTodoMutation.mutateAsync(text);
  const toggleTodo = (id: number) => toggleTodoMutation.mutateAsync(id);
  const deleteTodo = (id: number) => deleteTodoMutation.mutateAsync(id);

  return {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
