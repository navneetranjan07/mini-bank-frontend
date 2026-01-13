
export default function Topbar() {
  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <div>
        <h2 className="font-semibold text-lg">Client activities</h2>
        <p className="text-sm text-gray-400">Tuesday, October 23</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-medium">Sofie Lindgren</span>
        <img src="https://i.pravatar.cc/40" className="rounded-full" />
      </div>
    </div>
  );
}
