import { Outlet } from "react-router-dom";

export default function UserLayout() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
        <h2 className="font-bold text-lg">Mini Bank</h2>
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      <Outlet />
    </div>
  );
}
