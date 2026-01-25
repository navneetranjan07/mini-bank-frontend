import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:7070";

export default function AdminTransactions() {
  const [users, setUsers] = useState([]);
  const [openUserId, setOpenUserId] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API}/api/admin/transactions/user-wise`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  const toggle = (userId) => {
    setOpenUserId(openUserId === userId ? null : userId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User-wise Transactions</h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.userId} className="bg-white shadow rounded">
            {/* USER ROW */}
            <div className="flex justify-between items-center p-4">
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">
                  {user.totalTransactions} txns
                </span>

                <button
                  onClick={() => toggle(user.userId)}
                  className="text-blue-600 underline"
                >
                  {openUserId === user.userId ? "Hide" : "View"}
                </button>
              </div>
            </div>

            {/* TRANSACTIONS */}
            {openUserId === user.userId && (
              <div className="border-t px-4 pb-4">
                <table className="w-full text-sm border mt-3">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border p-2">Type</th>
                      <th className="border p-2">Amount</th>
                      <th className="border p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.transactions.map((t, i) => (
                      <tr key={i} className="text-center">
                        <td className="border p-2">{t.type}</td>
                        <td className="border p-2">₹ {t.amount}</td>
                        <td className="border p-2">
                          {new Date(t.transactionDate).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
