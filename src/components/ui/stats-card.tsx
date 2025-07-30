export default function StatCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  color: ColorVariant;
}) {
  const colorMap = {
    purple: "bg-purple-50 border-purple-200",
    emerald: "bg-emerald-50 border-emerald-200",
    blue: "bg-blue-50 border-blue-200",
    orange: "bg-orange-50 border-orange-200",
    slate: "bg-slate-50 border-slate-200",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border p-6 ${colorMap[color]}`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-white shadow-sm">{icon}</div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

type ColorVariant = "purple" | "emerald" | "blue" | "orange" | "slate";
