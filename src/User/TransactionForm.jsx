import { useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function TransactionForm({ accountNumber, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (type) => {
    try {
      setLoading(true);

      if (type === "TRANSFER") {
        await API.post("/transaction/transfer", {
          fromAccount: accountNumber,
          toAccount,
          amount
        });
      } else {
        await API.post(`/transaction/${type.toLowerCase()}`, {
          accountNumber,
          amount
        });
      }

      toast.success("Transaction successful");
      setAmount("");
      setToAccount("");
      onSuccess();
    } catch {
      toast.error("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Make a Transaction</h2>

      <input
        className="input mb-3"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="flex gap-3 mb-4">
        <button
          disabled={loading}
          onClick={() => handle("DEPOSIT")}
          className="btn-primary w-full"
        >
          Deposit
        </button>

        <button
          disabled={loading}
          onClick={() => handle("WITHDRAW")}
          className="btn-danger w-full"
        >
          Withdraw
        </button>
      </div>

      <input
        className="input mb-3"
        placeholder="To Account (Transfer)"
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
      />

      <button
        disabled={loading}
        onClick={() => handle("TRANSFER")}
        className="btn-primary w-full"
      >
        Transfer
      </button>
    </div>
  );
}
