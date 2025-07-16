import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const PublicRouteWrapper = () => {
  const { loading, token } = useSelector((state) => state.auth);
  if (!loading && token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PublicRouteWrapper;
