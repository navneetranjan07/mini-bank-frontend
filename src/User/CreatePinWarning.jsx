import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import CreatePinModal from "../components/CreatePinModal";

export default function CreatePinWarning() {
  const { pinSet } = useAuth();
  const navigate = useNavigate();

 
  if (pinSet === true) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CreatePinModal
        open={true}
        onSuccess={() => navigate("/dashboard", { replace: true })}
      />
    </div>
  );
}
