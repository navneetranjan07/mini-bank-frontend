import { useState } from "react";
import API from "../api/api";
import PinModal from "../components/PinModal";

export default function Transfer({ accountNumber }) {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmTransfer = async (pin) => {
    try {
      setLoading(true);
      await API.post("/transaction/transfer", {
        fromAccount: accountNumber,
        toAccount,
        amount,
        pin
      });
      alert("Transfer Successful");
      setAmount("");
      setToAccount("");
      setShowPin(false);
    } catch (e) {
      alert(e.response?.data || "Invalid PIN / Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <input
        placeholder="To Account"
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
      />
      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={() => setShowPin(true)}>
        Transfer
      </button>

      <PinModal
        open={showPin}
        onClose={() => setShowPin(false)}
        onConfirm={confirmTransfer}
        loading={loading}
      />
    </div>
  );
}
