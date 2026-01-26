import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:7070";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const auth = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/api/admin/users`, auth);
    setUsers(res.data);
  };

  const lockUser = async (id) => {
    if (!window.confirm("Lock this user?")) return;
    await axios.put(`${API}/api/admin/user/${id}/lock`, {}, auth);
    fetchUsers();
  };

  const unlockUser = async (id) => {
    if (!window.confirm("Unlock this user?")) return;
    await axios.put(`${API}/api/admin/user/${id}/unlock`, {}, auth);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="text-center">
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.role}</td>

                <td className="border p-2">
                  {u.locked ? (
                    <span className="text-red-600 font-semibold">
                      LOCKED
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      ACTIVE
                    </span>
                  )}
                </td>

                <td className="border p-2">
                  {u.locked ? (
                    <button
                      onClick={() => unlockUser(u.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Unlock
                    </button>
                  ) : (
                    <button
                      onClick={() => lockUser(u.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Lock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
