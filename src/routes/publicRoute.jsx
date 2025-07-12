import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import PublicRouteWrapper from "./PublicRouteWrapper";

const publicRoute = [
  {
    path: "/auth",
    element: <PublicRouteWrapper />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default publicRoute;
