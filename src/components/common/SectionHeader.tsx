import { cn } from "../../utils/clsx.utils";

export const SectionHeader: React.FC<{
  tag?: string; title: string; subtitle?: string;
  align?: "left" | "center"; action?: React.ReactNode;
}> = ({ tag, title, subtitle, align = "center", action }) => (
  <div className={cn("flex flex-col gap-3", align === "center" ? "items-center text-center" : "items-start")}>
    {tag && (
      <span className="text-xs font-bold uppercase tracking-widest text-accent">
        {tag}
      </span>
    )}
    <div className={cn("flex items-end justify-between w-full", align === "center" && "justify-center")}>
      <h2 className="font-display text-display-sm text-ink-900 leading-tight">{title}</h2>
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
    {subtitle && (
      <p className={cn("text-base text-ink-500 max-w-2xl", align === "center" && "text-center")}>
        {subtitle}
      </p>
    )}
  </div>
);