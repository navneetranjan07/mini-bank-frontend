import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function CreatePinModal({ open, onSuccess }) {
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPinSet } = useAuth();

  if (!open) return null;

  const submit = async () => {
    if (!pin.match(/^\d{4}$/)) {
      alert("PIN must be exactly 4 digits");
      return;
    }

    if (!password) {
      alert("Login password is required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/user/create-pin", {
        password,
        pin,
      });
 
      localStorage.setItem("pinSet", "true");
      setPinSet(true);
 
      onSuccess();

    } catch (e) {
      alert(e.response?.data || "Failed to create PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create Transaction PIN
        </h2>

        <input
          type="password"
          placeholder="Login Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          maxLength={4}
          placeholder="4-digit PIN"
          className="border p-2 w-full text-center text-xl tracking-widest rounded"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={submit}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create PIN"}
        </button>
      </div>
    </div>
  );
}
