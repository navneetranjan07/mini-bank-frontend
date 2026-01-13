import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./auth/PrivateRoute";

/* USER */
import UserDashboard from "./User/UserDashboard";

/* ADMIN */
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminUsers from "./Admin/AdminUsers";
import AdminAccounts from "./Admin/AdminAccounts";
import AdminTransactions from "./Admin/AdminTransactions";

export default function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= CUSTOMER ================= */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute roles={["ROLE_CUSTOMER"]}>
            <UserDashboard />
          </PrivateRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <PrivateRoute roles={["ROLE_ADMIN"]}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="accounts" element={<AdminAccounts />} />
        <Route path="transactions" element={<AdminTransactions />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}
