import { useEffect, useState } from "react";

export default function PinModal({ open, onClose, onConfirm, loading }) {
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (open) {
      setPin("");
    }
  }, [open]);

  if (!open) return null;

  const handleConfirm = () => {
    onConfirm(pin);
    setPin(""); 
  };

  const handleClose = () => {
    setPin(""); 
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">
        <h2 className="text-lg font-semibold mb-4">
          Enter Transaction PIN
        </h2>

        <input
          type="password"
          maxLength={4}
          className="input mb-4 text-center tracking-widest"
          placeholder="****"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            className="btn-secondary w-full"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="btn-primary w-full"
            onClick={handleConfirm}
            disabled={loading || pin.length !== 4}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
