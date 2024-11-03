import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-base border-2 border-border bg-white dark:border-darkBorder dark:bg-secondaryBlack",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
