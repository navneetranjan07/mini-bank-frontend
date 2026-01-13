export default function AlertsPanel() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">🚨 Recent Alerts</h3>

      <ul className="text-sm space-y-2">
        <li className="text-red-600">
          [High] User #9921 – Unusual Location Login
        </li>
        <li className="text-yellow-600">
          [Med] Trans #8822 – Swift Code Mismatch
        </li>
      </ul>
    </div>
  );
}
