import LeaderboardPage from "@/pages/leaderboard";
import ThreadsHome from "../pages/home";
import PrivateRouteWrapper from "./PrivateRouteWrapper";

const privateRoutes = [
  {
    path: "/",

    element: <PrivateRouteWrapper />,
    children: [
      { path: "", element: <ThreadsHome /> },
      { path: "/leaderboard", element: <LeaderboardPage /> },
    ],
  },
];

export default privateRoutes;
