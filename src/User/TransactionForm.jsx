import { useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import PinModal from "../components/PinModal";
import { useAuth } from "../auth/AuthContext";

export default function TransactionForm({ accountNumber, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(null);
  const { pinSet } = useAuth();

  // 🔒 HARD BLOCK IF PIN NOT SET
  if (!pinSet) {
    return (
      <div className="card text-center text-red-600">
        🔒 Please create your transaction PIN to use banking features.
      </div>
    );
  }

  // ================= DEPOSIT (NO PIN) =================
  const handleDeposit = async () => {
    try {
      setLoading(true);
      await API.post("/transaction/deposit", {
        accountNumber,
        amount
      });

      toast.success("Deposit successful");
      setAmount("");
      onSuccess();
    } catch (e) {
      toast.error(e.response?.data || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= WITHDRAW / TRANSFER (PIN REQUIRED) =================
  const handleConfirm = async (pin) => {
    if (!type) return;

    try {
      setLoading(true);

      if (type === "TRANSFER") {
        await API.post("/transaction/transfer", {
          fromAccount: accountNumber,
          toAccount,
          amount,
          pin
        });
      }

      if (type === "WITHDRAW") {
        await API.post("/transaction/withdraw", {
          accountNumber,
          amount,
          pin
        });
      }

      toast.success("Transaction successful");
      setAmount("");
      setToAccount("");
      onSuccess();
    } catch (e) {
      toast.error(e.response?.data || "Transaction failed");
    } finally {
      setLoading(false);
      setType(null);
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
          onClick={handleDeposit}
          className="btn-primary w-full"
        >
          Deposit
        </button>

        <button
          disabled={loading}
          onClick={() => setType("WITHDRAW")}
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
        onClick={() => setType("TRANSFER")}
        className="btn-primary w-full"
      >
        Transfer
      </button>

      <PinModal
        open={type === "WITHDRAW" || type === "TRANSFER"}
        onClose={() => setType(null)}
        onConfirm={handleConfirm}
        loading={loading}
      />
    </div>
  );
}
