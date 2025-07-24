import clsx from "clsx";

type StatusBadgeProps = {
  status: number;
  className?: string;
  label: string;
};

export function StatusBadge({
  status,
  label,
  className = "",
}: StatusBadgeProps) {
  const baseClass =
    "text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap";

  const statusClass = clsx({
    "bg-green-100 text-green-700": status === 0,
    "bg-red-100 text-red-700": status === 1,
  });

  return (
    <span className={`${baseClass} ${statusClass} ${className}`}>{label}</span>
  );
}
