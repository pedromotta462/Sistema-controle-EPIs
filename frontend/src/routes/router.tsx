import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Login,
  Employees,
  Storage,
  Layout,
  Profile,
} from "../screens/index";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "funcionarios",
          element: <Employees />,
        },
        {
          path: "estoque",
          element: <Storage />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
