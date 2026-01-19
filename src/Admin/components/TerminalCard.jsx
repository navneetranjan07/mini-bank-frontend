export default function TerminalCard({ title, value, change, warning }) {
  return (
    <div className="border border-gray-700 p-4 space-y-2">
      <div className="text-sm">{title}</div>
      <div className="text-xl font-bold">{value}</div>

      {change && (
        <div className="text-green-400">▲ {change} vs last</div>
      )}

      {warning && (
        <div className="text-yellow-400">⚠ Action Required</div>
      )}
    </div>
  );
}
