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
import Approvement from "../screens/Approvement";
import MyEPIs from "../screens/MyEPIs";
import Devolution from "../screens/Devolution";

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
        {
          path: "approvement",
          element: <Approvement />,
        },
        {
          path: "devolution",
          element: <Devolution />,
        },
        {
          path: "my-epis",
          element: <MyEPIs />,
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
