import { get, set } from "idb-keyval";

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt: number | null;
}

const TODOS_KEY = "todos";

async function loadTodosFromDB(): Promise<TodoItem[]> {
  const stored = (await get(TODOS_KEY)) as TodoItem[] | undefined;
  if (!stored) return [];

  return stored.map((todo) => ({
    ...todo,
    createdAt: todo.createdAt ?? Date.now(),
    completedAt: todo.completedAt ?? (todo.completed ? Date.now() : null),
  }));
}

async function saveTodosToDB(todos: TodoItem[]): Promise<void> {
  await set(TODOS_KEY, todos);
}

export async function getTodos(): Promise<TodoItem[]> {
  return await loadTodosFromDB();
}

export async function addTodosService(text: string): Promise<void> {
  const todos = await loadTodosFromDB();
  const now = Date.now();

  const newTodo: TodoItem = {
    id: now,
    text,
    completed: false,
    createdAt: now,
    completedAt: null,
  };

  await saveTodosToDB([...todos, newTodo]);
}

export async function toggleTodoService(id: number): Promise<void> {
  const todos = await loadTodosFromDB();

  const newTodos = todos.map((todo) => {
    if (todo.id !== id) return todo;
    const newCompleted = !todo.completed;

    return {
      ...todo,
      completed: newCompleted,
      completedAt: newCompleted ? Date.now() : null,
    };
  });

  await saveTodosToDB(newTodos);
}

export async function deleteTodoService(id: number): Promise<void> {
  const todos = await loadTodosFromDB();
  const newTodos = todos.filter((t) => t.id !== id);
  await saveTodosToDB(newTodos);
}
