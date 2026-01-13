import { useEffect, useState } from "react";
import API from "../api/api";

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/accounts")
      .then((res) => {
        setAccounts(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        setAccounts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading accounts...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Accounts</h1>

      {accounts.length === 0 ? (
        <p className="text-gray-500">No accounts found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Account Number</th>
              <th className="p-2 border">Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, index) => (
              <tr key={index}>
                <td className="p-2 border font-mono">
                  {acc.accountNumber}
                </td>
                <td className="p-2 border text-green-600 font-semibold">
                  ₹ {acc.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
