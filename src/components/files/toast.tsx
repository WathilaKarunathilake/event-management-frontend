import { toast } from "sonner";
import { Info } from "lucide-react";

export const showSuccessToast = (message: string) =>
  toast.success(message);

export const showErrorToast = (message: string) =>
  toast.error(message);

export const showInfoToast = (title: string, message: string) =>
  toast(message, {
    description: title,
    icon: <Info className="text-blue-500 h-5 w-5" />,
  });