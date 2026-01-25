import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API = "http://localhost:7070"; 

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };


  const fetchStats = async () => {
    const res = await axios.get(`${API}/api/admin/stats`, authHeader);
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/api/admin/users`, authHeader);
    setUsers(res.data);
  };

  const fetchAccounts = async () => {
    const res = await axios.get(`${API}/api/admin/accounts`, authHeader);
    setAccounts(res.data);
  };

  const fetchTransactions = async () => {
    const res = await axios.get(`${API}/api/admin/transactions`, authHeader);
    setTransactions(res.data);
  };


  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await axios.delete(`${API}/api/admin/user/${id}`, authHeader);
    fetchUsers();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };


  useEffect(() => {
    if (!token) navigate("/login");
    fetchStats();
    fetchUsers();
    fetchAccounts();
    fetchTransactions();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Stat title="Users" value={stats.totalUsers} />
        <Stat title="Accounts" value={stats.totalAccounts} />
        <Stat title="Total Balance" value={`₹ ${stats.totalBalance}`} />
        <Stat title="Txns (24h)" value={stats.last24hTxns} />
      </div>

      {/* USERS */}
      <Section title="All Users">
        <Table
          headers={["ID", "Name", "Email", "Role", "Action"]}
          rows={users.map((u) => [
            u.id,
            u.name,
            u.email,
            u.role,
            <button
              onClick={() => deleteUser(u.id)}
              className="text-red-600"
            >
              Delete
            </button>,
          ])}
        />
      </Section>

      {/* ACCOUNTS */}
      <Section title="All Accounts">
        <Table
          headers={["Account Number", "Balance"]}
          rows={accounts.map((a) => [
            a.accountNumber,
            `₹ ${a.balance}`,
          ])}
        />
      </Section>

      {/* TRANSACTIONS */}
      <Section title="All Transactions">
        <Table
          headers={["Type", "Amount", "Date"]}
          rows={transactions.map((t) => [
            t.type,
            `₹ ${t.amount}`,
            new Date(t.transactionDate).toLocaleString(),
          ])}
        />
      </Section>
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value ?? "-"}</h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((h) => (
              <th key={h} className="p-2 border">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="text-center">
              {row.map((cell, j) => (
                <td key={j} className="p-2 border">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
