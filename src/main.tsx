import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import HomePage from "./pages/HomePage";
import CompletedPage from "./pages/CompletedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout utama
    children: [
      { path: "/", element: <HomePage /> }, // halaman Home
      { path: "completed", element: <CompletedPage /> }, // Halaman Completed
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* optional : devtools biar bisa lihat query di browser */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
