import { useEffect, useState } from "react";
import API from "../api/api";

export default function TransactionHistory({ refreshKey }) {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    API.get("/transaction/my").then((res) =>
      setTxns(Array.isArray(res.data) ? res.data : [])
    );
  }, [refreshKey]);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

      {txns.length === 0 ? (
        <p className="text-gray-500">No transactions yet</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {txns.map((t, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="py-2">
                  <span
                    className={
                      t.type.includes("IN") || t.type === "DEPOSIT"
                        ? "badge-credit"
                        : "badge-debit"
                    }
                  >
                    {t.type}
                  </span>
                </td>
                <td>₹ {t.amount}</td>
                <td className="text-sm text-gray-500">
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
