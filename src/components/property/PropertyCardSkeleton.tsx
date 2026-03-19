import { Skeleton } from "../ui/Skeleton";

export const PropertyCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-card">
    <Skeleton className="w-full h-56" rounded="rounded-none" />
    <div className="p-4 space-y-3">
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-lg" />
        <Skeleton className="h-5 w-20 rounded-lg" />
      </div>
      <Skeleton className="h-5 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-1/2 rounded-lg" />
      <div className="flex gap-4 pt-1">
        <Skeleton className="h-4 w-12 rounded-md" />
        <Skeleton className="h-4 w-12 rounded-md" />
        <Skeleton className="h-4 w-14 rounded-md" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-ink-100">
        <Skeleton className="h-6 w-28 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>
    </div>
  </div>
);