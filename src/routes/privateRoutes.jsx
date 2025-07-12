import ThreadsHome from "../pages/home";
import PrivateRouteWrapper from "./PrivateRouteWrapper";

const privateRoutes = [
  {
    path: "/",

    element: <PrivateRouteWrapper />,
    children: [{ path: "", element: <ThreadsHome /> }],
  },
];

export default privateRoutes;
