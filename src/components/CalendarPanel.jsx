import { useEffect, useState } from "react";
import API from "../api/axios";

export default function CalendarPanel() {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    API.get("/transaction/my").then((res) => setTxns(res.data));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">Recent Transactions</h3>
      <ul className="text-sm space-y-2">
        {txns.map((t) => (
          <li key={t.id}>
            {t.type} – ₹{t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
