import { Skeleton } from "../ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="mx-auto max-w-sm p-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="size-11 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <Skeleton className="mx-auto mt-2 size-80 w-full max-w-md overflow-hidden lg:size-96" />
      <div className="mt-4">
        <Skeleton className="h-4 w-[40px]" />
        <Skeleton className="mt-4 h-4 w-[100px]" />
        <Skeleton className="mt-1 h-4 w-[140px]" />
      </div>
    </div>
  );
};

export default PostCardSkeleton;
