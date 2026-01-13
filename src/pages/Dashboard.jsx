import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    api.get("/account/me")
      .then(res => setAccount(res.data))
      .catch(() => alert("Failed to load account"));
  }, []);

  if (!account) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl">Welcome</h2>
      <p>Account No: {account.accountNumber}</p>
      <p>Balance: ₹{account.balance}</p>
    </div>
  );
}
