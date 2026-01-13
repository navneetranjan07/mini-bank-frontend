import { useEffect, useState } from "react";
import API from "../api/api";
import AccountCard from "./AccountCard";
import TransactionForm from "./TransactionForm";
import TransactionHistory from "./TransactionHistory";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [account, setAccount] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    API.get("/account/me").then((res) => setAccount(res.data));
  }, [refreshKey]);

  if (!account) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Bank Dashboard</h1>
        <button onClick={logout} className="btn-danger flex items-center gap-2">
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* BALANCE + ACTIONS */}
      <div className="grid md:grid-cols-2 gap-6">
        <AccountCard account={account} />
        <TransactionForm
          accountNumber={account.accountNumber}
          onSuccess={() => setRefreshKey((k) => k + 1)}
        />
      </div>

      {/* HISTORY */}
      <TransactionHistory refreshKey={refreshKey} />
    </div>
  );
}
