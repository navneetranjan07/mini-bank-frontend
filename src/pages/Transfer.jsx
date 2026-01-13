import { useState } from "react";
import API from "../api/api";

export default function Transfer() {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  const transfer = async () => {
    await API.post("/transaction/transfer", {
      toAccount,
      amount,
    });
    alert("Transfer Successful");
  };

  return (
    <div className="p-6">
      <input placeholder="To Account" onChange={(e) => setToAccount(e.target.value)} />
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <button onClick={transfer}>Transfer</button>
    </div>
  );
}
