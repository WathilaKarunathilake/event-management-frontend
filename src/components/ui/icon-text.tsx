import React from "react";

type IconTextProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function IconText({ icon, children, className = "" }: IconTextProps) {
  return (
    <div
      className={`flex items-center text-sm text-gray-600 gap-2 ${className}`}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}
