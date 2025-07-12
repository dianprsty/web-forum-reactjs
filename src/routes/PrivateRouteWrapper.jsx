import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRouteWrapper = () => {
  const { loading, token } = useSelector((state) => state.auth);
  if (!loading && !token) {
    return <Navigate to="/auth/login" />;
  }
  return <Outlet />;
};

export default PrivateRouteWrapper;
