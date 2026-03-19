import { cn } from "../../utils/clsx.utils";

export const Divider: React.FC<{ label?: string; className?: string }> = ({ label, className }) => (
  <div className={cn("flex items-center gap-3 w-full", className)}>
    <div className="flex-1 h-px bg-ink-200" />
    {label && <span className="text-xs text-ink-400 font-medium whitespace-nowrap px-1">{label}</span>}
    {label && <div className="flex-1 h-px bg-ink-200" />}
  </div>
);