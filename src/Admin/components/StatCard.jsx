export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}
