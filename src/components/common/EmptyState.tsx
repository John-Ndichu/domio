import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { Home, type LucideIcon } from "lucide-react";
interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; href?: string; onClick?: () => void };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = Home,
  title,
  description,
  action,
  className = "",
}) => {
  const Icon = icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center py-20 text-center ${className}`}
    >
      <div className="text-6xl mb-5">
        <Icon />
      </div>

      <h3 className="font-display text-2xl text-ink-900 mb-2">
        {title}
      </h3>

      {description && (
        <p className="text-ink-500 text-sm max-w-sm mb-7 leading-relaxed">
          {description}
        </p>
      )}

      {action && (
        action.href ? (
          <Link to={action.href}>
            <Button size="md">{action.label}</Button>
          </Link>
        ) : (
          <Button size="md" onClick={action.onClick}>
            {action.label}
          </Button>
        )
      )}
    </motion.div>
  );
};