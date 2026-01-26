import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ roles, children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const locked = localStorage.getItem("locked");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (locked === "true" && role === "ROLE_CUSTOMER") {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}
