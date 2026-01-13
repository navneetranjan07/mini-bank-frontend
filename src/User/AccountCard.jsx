import { CreditCard } from "lucide-react";

export default function AccountCard({ account }) {
  return (
    <div className="card bg-gradient-to-br from-blue-600 to-blue-500 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Account Balance</h2>
        <CreditCard />
      </div>

      <p className="text-4xl font-bold mb-4">
        ₹ {account.balance}
      </p>

      <p className="text-sm opacity-90">
        Account No: {account.accountNumber}
      </p>
    </div>
  );
}
