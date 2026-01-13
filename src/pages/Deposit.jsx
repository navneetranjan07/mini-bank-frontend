import { useState } from "react";
import API from "../api/api";

export default function Deposit() {
  const [amount, setAmount] = useState("");

  const deposit = async () => {
    await API.post("/transaction/deposit", { amount });
    alert("Amount Deposited");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl">Deposit</h2>
      <input
        className="border p-2"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={deposit} className="ml-2 bg-green-600 text-white px-4 py-2">
        Deposit
      </button>
    </div>
  );
}
