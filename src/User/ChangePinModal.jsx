import { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function ChangePinModal({ open, onClose }) {
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Clear inputs whenever modal opens/closes
  useEffect(() => {
    if (!open) {
      setOldPin("");
      setNewPin("");
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const submit = async () => {
    if (oldPin.length !== 4 || newPin.length !== 4) {
      toast.error("PIN must be exactly 4 digits");
      return;
    }

    if (oldPin === newPin) {
      toast.error("New PIN must be different");
      return;
    }

    try {
      setLoading(true);

      await API.post("/user/change-pin", {
        oldPin,
        newPin,
      });

      toast.success("Transaction PIN changed successfully");
      onClose(); // ✅ close modal after success
    } catch (e) {
      toast.error(e.response?.data || "Failed to change PIN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4">
          Change Transaction PIN
        </h2>

        <input
          type="password"
          maxLength={4}
          placeholder="Old PIN"
          className="input mb-3 text-center tracking-widest"
          value={oldPin}
          onChange={(e) => setOldPin(e.target.value)}
        />

        <input
          type="password"
          maxLength={4}
          placeholder="New PIN"
          className="input mb-4 text-center tracking-widest"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            className="btn-secondary w-full"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn-primary w-full"
            onClick={submit}
            disabled={loading}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
