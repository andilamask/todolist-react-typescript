import { useEffect, useState } from "react";
import { get, set } from "idb-keyval";

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const TODOS_KEY = "todos";

export function useIndexedTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1) Waktu pertama kali component mount → baca dari IndexedDB
  useEffect(() => {
    async function loadTodos() {
      try {
        const saved = (await get<TodoItem[]>(TODOS_KEY)) || [];
        setTodos(saved);
      } catch (err) {
        console.error("Gagal load todos dari IndexedDB", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadTodos();
  }, []);

  // 2) Setiap todos berubah → simpan ke IndexedDB
  useEffect(() => {
    if (isLoading) return; // jangan save pas pertama kali sebelum data ke-load
    async function saveTodos() {
      try {
        await set(TODOS_KEY, todos);
      } catch (err) {
        console.error("Gagal simpan todos ke IndexedDB", err);
      }
    }

    saveTodos();
  }, [todos, isLoading]);

  // 3) Helper functions untuk operasi todo
  const addTodo = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
