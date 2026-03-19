import type { TabItem } from "../../types";

export const Tabs: React.FC<{
  tabs: TabItem[]; active: string;
  onChange: (id: string) => void; className?: string; size?: "sm" | "md";
}> = ({ tabs, active, onChange, className, size = "md" }) => {
  const s = size === "sm" ? "text-sm h-9 px-3.5" : "text-sm h-11 px-4";
  return (
    <div className={cn("flex items-center gap-1 bg-ink-100 rounded-2xl p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id} onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          className={cn(
            "relative flex items-center gap-2 font-semibold rounded-xl transition-all duration-200",
            s,
            tab.id === active ? "bg-white text-ink-900 shadow-card" : "text-ink-500 hover:text-ink-700"
          )}
        >
          {tab.label}
          {tab.badge !== undefined && (
            <span className={cn(
              "text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold",
              tab.id === active ? "bg-accent text-white" : "bg-ink-200 text-ink-600"
            )}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};