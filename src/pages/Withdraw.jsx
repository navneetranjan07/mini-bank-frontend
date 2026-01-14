import { useState } from "react";
import API from "../api/api";
import PinModal from "../components/PinModal";

export default function Withdraw({ accountNumber }) {
  const [amount, setAmount] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmWithdraw = async (pin) => {
    try {
      setLoading(true);
      await API.post("/transaction/withdraw", {
        accountNumber,
        amount,
        pin
      });
      alert("Amount Withdrawn");
      setAmount("");
      setShowPin(false);
    } catch (e) {
      alert(e.response?.data || "Invalid PIN / Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-3">Withdraw</h2>

      <input
        className="border p-2"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={() => setShowPin(true)}
        className="ml-2 bg-red-600 text-white px-4 py-2"
      >
        Withdraw
      </button>

      <PinModal
        open={showPin}
        onClose={() => setShowPin(false)}
        onConfirm={confirmWithdraw}
        loading={loading}
      />
    </div>
  );
}
