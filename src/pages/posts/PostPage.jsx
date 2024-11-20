import { getAllPosts } from "@/query/post";
import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/post/PostCard";
import { useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";
import PostCardSkeleton from "@/components/post/PostCardSkeleton";
import StoriesUser from "@/components/stories/StoriesUser";
import axiosInstance from "@/apis/axiosInstance";
import SkeletonStories from "@/components/stories/SkeletonStories";
import logoWithText from "/logo_horizontal.png";

const PostPage = () => {
  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ["allposts"],
    queryFn: getAllPosts,
    staleTime: 100 * 60,
  });

  const {
    isLoading: isLoadingStories,
    error: errorStories,
    data: dataStories,
    isSuccess: isSuccessStories,
  } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const reponse = await axiosInstance.get("/stories/users");
      return reponse.data;
    },
    staleTime: 100 * 60,
  });

  const getUsernameLogin = useSelector(
    (state) => state.authState.user.username,
  );

  return (
    <main className="mx-auto">
      <div className="sticky top-0 z-20 mx-auto w-full border-b-2 border-border bg-white">
        <header className="top-0 mx-auto flex h-fit max-w-screen-lg items-center justify-between bg-white pr-4">
          <div className="flex items-center gap-2 p-4">
            <img
              className="size-2/6 overflow-hidden object-cover"
              src={logoWithText}
              alt="Socialyze Logo"
            />
          </div>
          <Sidebar className="size-9" data={getUsernameLogin} />
        </header>
      </div>

      <div className="scrollbar-hide mx-auto max-w-sm overflow-scroll whitespace-nowrap rounded-md p-4">
        <div className="flex w-max flex-row gap-4 p-2">
          {isLoadingStories && (
            <div className="flex-rol flex items-center justify-center gap-6">
              <SkeletonStories />
              <SkeletonStories />
              <SkeletonStories />
              <SkeletonStories />
              <SkeletonStories />
            </div>
          )}
          {isSuccessStories && dataStories
            ? dataStories.data.map((story) => (
                <StoriesUser key={story.id} data={story} />
              ))
            : null}
        </div>
      </div>

      {isLoading && (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      )}
      {isSuccess && data.data.length > 0
        ? data.data.map((post) => <PostCard key={post.id} data={post} />)
        : null}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808045_1px,transparent_1px),linear-gradient(to_bottom,#80808045_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </main>
  );
};

export default PostPage;
