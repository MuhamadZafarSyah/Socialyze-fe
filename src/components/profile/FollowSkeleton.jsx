import { Skeleton } from "../ui/skeleton";

const FollowSkeleton = () => {
  return (
    <Skeleton className="mx-auto w-full p-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="size-11 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[140px]" />
        </div>
      </div>
    </Skeleton>
  );
};

export default FollowSkeleton;
