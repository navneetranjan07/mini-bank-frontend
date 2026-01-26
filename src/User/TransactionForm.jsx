import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";
import PinModal from "../components/PinModal";

export default function TransactionForm({ accountNumber, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const navigate = useNavigate();

  const handleConfirm = async (pin) => {
    try {
      setLoading(true);

      if (!amount || Number(amount) <= 0) {
        toast.error("Enter valid amount");
        return;
      }

      if (action === "WITHDRAW") {
        await API.post("/transaction/withdraw", {
          accountNumber,
          amount: Number(amount),
          pin
        });
      }

      if (action === "TRANSFER") {
        if (!toAccount) {
          toast.error("Enter receiver account number");
          return;
        }

        await API.post("/transaction/transfer", {
          accountNumber,
          toAccount,
          amount: Number(amount),
          pin
        });
      }

      toast.success("Transaction successful");
      setAmount("");
      setToAccount("");
      setAction(null);
      onSuccess();

    } catch (e) {
      const message = e.response?.data;
      if (message?.includes("User Locked")) {
        toast.error("Your account has been locked due to multiple incorrect PIN attempts. Please contact your branch.");
       localStorage.setItem("locked", "true");
       localStorage.removeItem("token");
       localStorage.removeItem("role");

       setTimeout(() => {
         navigate("/login", { replace: true });
       }, 1500);
      } else {
        toast.error(message || "Transaction failed");
      }
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
          onClick={() => setAction("WITHDRAW")}
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
        onClick={() => setAction("TRANSFER")}
        className="btn-primary w-full"
      >
        Transfer
      </button>


      <PinModal
        open={action === "WITHDRAW" || action === "TRANSFER"}
        onClose={() => setAction(null)}
        onConfirm={handleConfirm}
        loading={loading}
      />
    </div>
  );
}
