import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonStories = () => {
  return (
    <div className="col-center-center">
      <Skeleton className="size-11 rounded-full" />
      <Skeleton className="mt-2 h-3 w-[50px]" />
    </div>
  );
};

export default SkeletonStories;
