import { Card } from "@/components/ui/card";
import clsx from "clsx";
import { getRegistrationStatusLabel } from "@/lib/helpers";
import type { GetRegisteredUsers } from "@/models/RegisterModel";

export function UserDetailsCard({ user }: { user: GetRegisteredUsers }) {
  return (
    <Card
      key={user.email}
      className="p-6 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
            User Details
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {user.phoneNumber}
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-[220px]">
          <h3 className="text-lg font-semibold mb-2 border-b border-gray-300 pb-1">
            Account Details
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-medium">Account Name:</span>{" "}
              {user.accountName}
            </p>
            <p>
              <span className="font-medium">Account Email:</span>{" "}
              {user.accountEmail}
            </p>
            <p>
              <span className="font-medium">Account Phone:</span>{" "}
              {user.accountPhoneNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between min-w-[140px]">
          <span
            className={clsx(
              "text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap",
              {
                "bg-green-100 text-green-700": user.registerType === 0,
                "bg-red-100 text-red-700": user.registerType === 1,
              },
            )}
          >
            {getRegistrationStatusLabel(user.registerType)}
          </span>
        </div>
      </div>
    </Card>
  );
}
