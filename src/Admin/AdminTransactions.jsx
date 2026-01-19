import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080";

export default function AdminTransactions() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API}/api/admin/transactions/user-wise`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User-wise Transactions</h1>

      {users.map((user) => (
        <div key={user.userId} className="bg-white shadow rounded p-4">
          {/* USER HEADER */}
          <div className="flex justify-between mb-3">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
              Total: {user.totalTransactions}
            </span>
          </div>

          {/* TRANSACTION TABLE */}
          <table className="w-full border text-sm">
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
      ))}
    </div>
  );
}
