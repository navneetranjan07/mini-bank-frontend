import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function CreatePinModal({ open }) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPinSet } = useAuth();

  if (!open) return null;

  const submit = async () => {
    if (!pin.match(/^\d{4}$/)) {
      alert("PIN must be exactly 4 digits");
      return;
    }

    try {
      setLoading(true);
      await api.post("/user/create-pin", { pin });
      setPinSet(true);
      localStorage.setItem("pinSet", "true");
    } catch (e) {
      alert(e.response?.data || "Failed to create PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="text-lg font-semibold mb-2">
          Create Transaction PIN
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          You must create a PIN to continue banking.
        </p>

        <input
          type="password"
          maxLength={4}
          className="border p-2 w-full text-center text-xl tracking-widest"
          placeholder="****"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={submit}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Saving..." : "Create PIN"}
        </button>
      </div>
    </div>
  );
}
