import { createBrowserRouter } from "react-router";
import publicRoute from "./publicRoute";
import privateRoutes from "./privateRoutes";

const routes = publicRoute.concat(privateRoutes);

export const router = createBrowserRouter(routes);
