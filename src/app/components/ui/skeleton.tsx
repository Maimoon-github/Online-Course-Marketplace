import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-gradient-to-r from-[#1F2937] via-[#2a3f4f] to-[#1F2937] rounded-lg animate-shimmer",
        className
      )}
      {...props}
    />
  );
}

/**
 * Course Card Skeleton - matches CourseCard layout
 */
function CourseCardSkeleton() {
  return (
    <div className="bg-[#1F2937] rounded-xl overflow-hidden border border-white/5 p-0">
      {/* Thumbnail skeleton */}
      <Skeleton className="h-40 w-full mb-0" />
      
      {/* Content area */}
      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
        
        {/* Instructor & metadata */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-1/3 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
        
        {/* Rating */}
        <Skeleton className="h-4 w-2/5 rounded-md" />
        
        {/* Price and button */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-1/4 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/**
 * Dashboard stats skeleton
 */
function StatsSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-1/3 rounded-md" />
      <Skeleton className="h-8 w-1/4 rounded-md" />
      <Skeleton className="h-2 w-full rounded-full" />
    </div>
  );
}

/**
 * Text line skeleton - useful for paragraphs
 */
function TextSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
      <Skeleton className="h-4 w-4/5 rounded-md" />
    </div>
  );
}

/**
 * Avatar skeleton
 */
function AvatarSkeleton({ className = "h-10 w-10" }: { className?: string }) {
  return <Skeleton className={cn("rounded-full", className)} />;
}

export { Skeleton, CourseCardSkeleton, StatsSkeleton, TextSkeleton, AvatarSkeleton };
