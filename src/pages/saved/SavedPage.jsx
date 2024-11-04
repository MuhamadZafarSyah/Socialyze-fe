import PostCard from "@/components/post/PostCard";
import PostCardSkeleton from "@/components/post/PostCardSkeleton";
import Sidebar from "@/components/Sidebar";
import { getSavePost } from "@/query/savedPost";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import noSave from "/images/no-save.png";

const SavedPage = () => {
  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ["getsavedpost"],
    queryFn: getSavePost,
  });

  console.log(data);

  const getUserLogin = useSelector((state) => state.authState.user);

  return (
    <main className="mx-auto">
      <div className="sticky top-0 z-20 mx-auto w-full border-b-2 border-border bg-white">
        <header className="top-0 mx-auto flex h-fit max-w-screen-lg items-center justify-between bg-white pr-4">
          <div className="flex items-center gap-2 p-4">
            <span className="text-lg font-semibold">Saved Post</span>
          </div>
          <Sidebar data={getUserLogin.username} />
        </header>
      </div>

      {isLoading ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      ) : isSuccess && data.data.length > 0 ? (
        data.data.map((post) => <PostCard key={post.id} data={post} />)
      ) : (
        <div className="mx-auto flex h-screen items-center justify-center !overflow-hidden">
          <img
            src={noSave}
            className="mix-blend-mode size-80 bg-blend-overlay"
            alt="No Post"
          />
        </div>
      )}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
    </main>
  );
};

export default SavedPage;
