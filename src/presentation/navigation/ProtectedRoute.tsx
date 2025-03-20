import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../infrastructure/state/context/AuthContext";

interface ProtectedRouteProps {
  type?: "public" | "protected" | "admin";
}

const ProtectedRoute = ({ type = "public" }: ProtectedRouteProps) => {
  const { isSignedIn, user } = useAuthContext();

  if (type === "protected" && !isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (type === "admin" && (!isSignedIn || user?.role !== "admin")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
