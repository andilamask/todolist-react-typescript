import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import CompletedPage from "./pages/CompletedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout utama
    children: [
      {
        index: true, // path: "/"
        element: <HomePage />,
      },
      {
        path: "completed", // path: "/completed"
        element: <CompletedPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
