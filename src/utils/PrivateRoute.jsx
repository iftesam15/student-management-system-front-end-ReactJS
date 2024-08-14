import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
