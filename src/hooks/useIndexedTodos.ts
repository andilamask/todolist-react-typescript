import { useEffect, useState } from "react";
import { get, set } from "idb-keyval";

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number; // timestamp saat todo dibuat
  completedAt: number | null; // timestamp saat todo selesai, null kalau belum
}

const TODOS_KEY = "todos";

export function useIndexedTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // load todos dari IndexedDB saat mount
  useEffect(() => {
    let active = true;

    const loadTodos = async () => {
      try {
        const stored = (await get(TODOS_KEY)) as TodoItem[] | undefined;

        if (active && stored) {
          // fallback kalau data lama belum punya createdAt/completedAt
          const fixed = stored.map((todo) => ({
            ...todo,
            createdAt: todo.createdAt ?? Date.now(),
            completedAt:
              todo.completedAt ?? (todo.completed ? Date.now() : null),
          }));
          setTodos(fixed);
        }
      } catch (err) {
        console.error("Gagal load todos dari IndexedDB", err);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadTodos();

    return () => {
      active = false;
    };
  }, []);

  const persistAndSetTodos = async (newTodos: TodoItem[]) => {
    try {
      await set(TODOS_KEY, newTodos);
      setTodos(newTodos);
    } catch (err) {
      console.error("Gagal simpan todos ke IndexedDB", err);
    }
  };

  // tambah todo
  const addTodo = async (text: string) => {
    const now = Date.now();
    const newTodo: TodoItem = {
      id: now,
      text,
      completed: false,
      createdAt: now,
      completedAt: null,
    };

    const newTodos = [...todos, newTodo];
    await persistAndSetTodos(newTodos);
  };

  // toggle todo
  const toggleTodo = async (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;

      const newCompleted = !todo.completed;

      return {
        ...todo,
        completed: newCompleted,
        completedAt: newCompleted ? Date.now() : null,
      };
    });

    await persistAndSetTodos(newTodos);
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    await persistAndSetTodos(newTodos);
  };

  return {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
