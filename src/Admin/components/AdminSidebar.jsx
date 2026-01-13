import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin", exact: true },
  { name: "User Mgmt", path: "/admin/users" },
  { name: "Transactions", path: "/admin/transactions" },
  { name: "Loan Approvals", path: "/admin/loans" },
  { name: "Interest Rates", path: "/admin/rates" },
  { name: "Staff Logs", path: "/admin/staff" },
  { name: "Settings", path: "/admin/settings" }
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-gray-200 p-5">
      <h1 className="text-xl font-bold mb-6">🏦 BANK_ADMIN</h1>

      <nav className="space-y-3">
        {menu.map(m => (
          <NavLink
            key={m.name}
            to={m.path}
            end={m.exact}   // 🔥 THIS FIXES IT
            className={({ isActive }) =>
              `block px-3 py-2 rounded transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`
            }
          >
            {m.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
