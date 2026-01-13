
import { LayoutDashboard, Users, CreditCard, FileText } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow h-screen p-6">
      <h1 className="text-2xl font-bold text-primary mb-8">Back Office</h1>
      <nav className="space-y-3">
        <Item icon={<LayoutDashboard />} text="Dashboard" active />
        <Item icon={<Users />} text="Clients" />
        <Item icon={<CreditCard />} text="Bank Products" />
        <Item icon={<FileText />} text="Documents" />
      </nav>
    </div>
  );
}

function Item({ icon, text, active }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer
      ${active ? "bg-primary text-white" : "hover:bg-gray-100"}`}>
      {icon}
      {text}
    </div>
  );
}
