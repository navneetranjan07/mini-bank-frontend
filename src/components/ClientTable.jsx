import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ClientTable() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    API.get("/account/me").then((res) => setAccount(res.data));
  }, []);

  if (!account) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">My Account</h3>

      <p><b>Account No:</b> {account.accountNumber}</p>
      <p><b>Balance:</b> ₹ {account.balance}</p>
    </div>
  );
}
