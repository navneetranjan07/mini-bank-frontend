import { useEffect, useState } from "react";
import api from "../api/axios";
import CreatePinModal from "../components/CreatePinModal";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const [account, setAccount] = useState(null);
  const { pinSet } = useAuth();

  useEffect(() => {
    api.get("/account/me")
      .then(res => setAccount(res.data))
      .catch(() => alert("Failed to load account"));
  }, []);

  if (!account) return <p className="p-6">Loading...</p>;

  return (
    <>
      <CreatePinModal open={!pinSet} />

      <div className="p-6">
        <h2 className="text-xl">Welcome</h2>
        <p>Account No: {account.accountNumber}</p>
        <p>Balance: ₹{account.balance}</p>

        {!pinSet && (
          <p className="mt-4 text-red-600">
            🔒 Please create your transaction PIN to continue.
          </p>
        )}
      </div>
    </>
  );
}
