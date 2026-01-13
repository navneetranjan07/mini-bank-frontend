import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "./components/StatCard";
import AlertsPanel from "./components/AlertsPanel";
import TransactionChart from "./components/TransactionChart";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(() => alert("Failed to load stats"));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Accounts" value={stats.totalAccounts} />
        <StatCard title="Total Assets" value={`₹ ${stats.totalBalance}`} />
        <StatCard title="Transactions (24h)" value={stats.transactionsLast24h} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <AlertsPanel />
        <div className="col-span-2">
          <TransactionChart />
        </div>
      </div>

    </div>
  );
}
