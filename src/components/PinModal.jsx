import { useState } from "react";

export default function PinModal({ open, onClose, onConfirm, loading }) {
  const [pin, setPin] = useState("");

  if (!open) return null;

  const submit = () => {
    if (!pin.match(/^\d{4}$/)) {
      alert("PIN must be 4 digits");
      return;
    }
    onConfirm(pin);
    setPin("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-80">
        <h3 className="text-lg font-semibold mb-4">Enter Transaction PIN</h3>

        <input
          type="password"
          maxLength={4}
          className="border p-2 w-full text-center tracking-widest text-xl"
          placeholder="****"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={submit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
