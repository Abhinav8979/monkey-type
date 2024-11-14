import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VsMode from "./pages/VsMode.tsx";
import Practice from "./pages/Practice.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "play-1v1",
        element: <VsMode />,
      },
      {
        path: "practice",
        element: <Practice />,
      },
      {
        path: "/",
        element: <Practice />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
