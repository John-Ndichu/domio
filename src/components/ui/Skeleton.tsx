import { cn } from "../../utils/clsx.utils";

export const Skeleton: React.FC<{ className?: string; rounded?: string }> = ({
  className, rounded = "rounded-xl",
}) => <div className={cn("skeleton", rounded, className)} />;