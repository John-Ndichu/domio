import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

export const TOAST_ICONS = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
  error:   <AlertCircle  className="w-5 h-5 text-red-500 flex-shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
  info:    <Info          className="w-5 h-5 text-blue-500 flex-shrink-0" />,
};
export const TOAST_BG = {
  success: "border-emerald-100 bg-white",
  error:   "border-red-100   bg-white",
  warning: "border-amber-100 bg-white",
  info:    "border-blue-100  bg-white",
};