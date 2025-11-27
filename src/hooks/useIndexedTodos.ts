import { useEffect, useState } from "react"; //kurangi penggunaan useEffect
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

  // load todos dari IndexedDB saat mount

  useEffect(() => {
    const loadTodos = async () => {
      const stored = await get(TODOS_KEY); // ambil data dari IndexedDB
      if (stored) {
        setTodos(stored); // set ke state jika ada data
      }
      setIsLoading(false); // maksud false biar loadingnya berhenti
    };
    loadTodos(); // panggil fungsi loadTodos, tidak pakai return karena bukan cleanup
  }, []); // [] supaya cuman jalan sekali saat mount

  // Helper: simpan dulu -> baru set state

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
    const newTodo = { id: Date.now(), text, completed: false };
    const newTodos = [...todos, newTodo];
    await persistAndSetTodos(newTodos);
  };

  // toggle todo

  const toggleTodo = async (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
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
