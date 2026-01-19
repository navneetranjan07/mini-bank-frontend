export default function SystemHealth() {
  return (
    <div className="border border-gray-700 p-4 space-y-3">
      <h3>SYSTEM HEALTH (Server Load)</h3>

      <div>
        CPU Usage
        <div className="bg-gray-800 h-2 mt-1">
          <div className="bg-green-400 h-2 w-[60%]" />
        </div>
      </div>

      <div>
        Memory Usage
        <div className="bg-gray-800 h-2 mt-1">
          <div className="bg-blue-400 h-2 w-[30%]" />
        </div>
      </div>
    </div>
  );
}
