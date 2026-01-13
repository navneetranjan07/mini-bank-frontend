import { useEffect, useState } from "react";
import API from "../api/api";

export default function Transactions() {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/transaction/history").then(res => setList(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl">Transaction History</h2>
      <ul>
        {list.map((t) => (
          <li key={t.id}>
            {t.type} - ₹{t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
