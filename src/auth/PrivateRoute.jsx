import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" />;

  if (roles && !roles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return children;
}
