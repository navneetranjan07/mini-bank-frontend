import { useState } from "react";
import API from "../api/api";

export default function Withdraw() {
  const [amount, setAmount] = useState("");

  const withdraw = async () => {
    await API.post("/transaction/withdraw", { amount });
    alert("Amount Withdrawn");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl">Withdraw</h2>
      <input
        className="border p-2"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={withdraw} className="ml-2 bg-red-600 text-white px-4 py-2">
        Withdraw
      </button>
    </div>
  );
}
