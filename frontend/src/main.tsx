import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VsMode from "./pages/VsMode.tsx";
import Practice from "./pages/Practice.tsx";
import PracticeProvider from "./redux/PracticeProvider.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import Login from "./pages/Login.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "play-1v1",
        element: (
          <ProtectedRoute>
            <VsMode />
          </ProtectedRoute>
        ),
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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <CreateAccount />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PracticeProvider>
      <RouterProvider router={router} />
    </PracticeProvider>
  </StrictMode>
);
