import PostCard from "@/components/post/PostCard";
import PostCardSkeleton from "@/components/post/PostCardSkeleton";
import Sidebar from "@/components/Sidebar";
import { detailPost } from "@/query/post";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const DetailPostPage = () => {
  const { username } = useParams();

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ["detailPost"],
    queryFn: () => detailPost(username),
    staleTime: 100 * 60,
  });

  const getUserLogin = useSelector((state) => state.authState.user);

  return (
    <>
      <div className="sticky top-0 z-20 mx-auto w-full border-b-2 border-border bg-white">
        <header className="top-0 mx-auto flex h-fit max-w-screen-lg items-center justify-between bg-white pr-4">
          <div className="flex items-center gap-2 p-4">
            <Link to={`/${username}`} className="text-lg font-semibold">
              <ArrowLeft />
            </Link>
            <span className="text-lg font-semibold">Posts By @{username}</span>
          </div>
          <Sidebar data={getUserLogin.username} />
        </header>
      </div>
      <main className="relative mx-auto max-w-screen-sm">
        {isLoading && (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}

        {error && <p>Error: {error.message}</p>}
        {isSuccess && data ? (
          data.data.map((post) => <PostCard key={post.id} data={post} />)
        ) : (
          <p>No posts available</p>
        )}
      </main>
      <div className="fixed bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="fixed bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_70%,transparent_110%)]"></div>
    </>
  );
};

export default DetailPostPage;
