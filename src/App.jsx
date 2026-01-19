import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./auth/PrivateRoute";

import UserDashboard from "./User/UserDashboard";
import CreatePinWarning from "./User/CreatePinWarning";

import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminUsers from "./Admin/AdminUsers";
import AdminAccounts from "./Admin/AdminAccounts";
import AdminTransactions from "./Admin/AdminTransactions";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* CUSTOMER ROUTES */}
      <Route element={<PrivateRoute roles={["ROLE_CUSTOMER"]} />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/create-pin" element={<CreatePinWarning />} />
      </Route>

      {/* ADMIN ROUTES */}
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

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
