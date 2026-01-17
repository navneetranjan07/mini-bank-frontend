import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ roles }) {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
