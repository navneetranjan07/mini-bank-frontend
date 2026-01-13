import { useEffect, useState } from "react";
import API from "../api/api";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/transactions")
      .then((res) => {
        setTransactions(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Transactions</h1>

      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td className="p-2 border font-semibold">
                  {t.type}
                </td>
                <td className="p-2 border">
                  ₹ {t.amount}
                </td>
                <td className="p-2 border text-sm text-gray-600">
                  {new Date(t.transactionDate).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
