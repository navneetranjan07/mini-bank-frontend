export default function AdminTopbar() {
  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <input
        placeholder="Search: Customer ID / Trans ID..."
        className="border px-4 py-2 rounded w-96"
      />

      <div className="flex items-center gap-4">
        🔔
        <span className="font-semibold">Admin</span>
      </div>
    </header>
  );
}
