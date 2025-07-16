import LeaderboardPage from "@/pages/leaderboard";
import ThreadsHome from "@/pages/thread/home";
import ProfilePage from "@/pages/profile";
import ExplorePage from "@/pages/explore";
import CreatePostPage from "@/pages/post/create";
import ThreadDetailPage from "@/pages/thread/detail";
import PrivateRouteWrapper from "./PrivateRouteWrapper";

const privateRoutes = [
  {
    path: "/",

    element: <PrivateRouteWrapper />,
    children: [
      { path: "", element: <ThreadsHome /> },
      { path: "/leaderboard", element: <LeaderboardPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/explore", element: <ExplorePage /> },
      { path: "/post/create", element: <CreatePostPage /> },
      { path: "/thread/:threadId", element: <ThreadDetailPage /> },
    ],
  },
];

export default privateRoutes;
