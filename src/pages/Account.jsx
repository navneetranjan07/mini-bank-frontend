import { useEffect, useState } from "react";
import API from "../api/api";

export default function Account() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    API.get("/account/me").then(res => setAccount(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">My Account</h2>
      <p>Account No: {account.accountNumber}</p>
      <p>Balance: ₹{account.balance}</p>
    </div>
  );
}
