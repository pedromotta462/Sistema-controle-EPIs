import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Login,
  Employees,
  Storage,
  Layout,
  Profile,
} from "../screens/index";

const Router = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;

}

export default Router