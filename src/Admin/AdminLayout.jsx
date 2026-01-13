import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">
          <NavLink to="/admin" end>Admin Panel</NavLink>  
        </h2>

        <nav className="space-y-2">
          <NavLink to="/admin" end className="block hover:text-blue-400">
            Dashboard
          </NavLink>
          <NavLink to="/admin/users" className="block hover:text-blue-400">
            Users
          </NavLink>
          <NavLink to="/admin/accounts" className="block hover:text-blue-400">
            Accounts
          </NavLink>
          <NavLink to="/admin/transactions" className="block hover:text-blue-400">
            Transactions
          </NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-10 bg-red-600 w-full py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
