import FollowCard from "@/components/profile/FollowCard";
import FollowSkeleton from "@/components/profile/FollowSkeleton";
import { getFollowing } from "@/query/follow";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Send } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar";

const FollowingPage = () => {
  const { username } = useParams();

  const { isLoading, data, isSuccess, error } = useQuery({
    queryKey: ["following", username],
    queryFn: () => getFollowing(username),
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
            <span className="text-lg font-semibold">@{username}</span>
          </div>
          <Sidebar data={getUserLogin.username} />
        </header>
      </div>
      <main className="relative mx-auto max-w-screen-sm">
        <div className="mt-4 flex flex-col gap-3 px-4">
          {isLoading ? (
            <>
              <FollowSkeleton />
              <FollowSkeleton />
              <FollowSkeleton />
            </>
          ) : isSuccess && data.data.length > 0 ? (
            <Command className="w-full">
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                {data.data.map((follow) => (
                  <CommandItem key={follow} className="p-2">
                    <FollowCard data={follow} />
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          ) : (
            <div className="center-center">
              <span>There's no one</span>
            </div>
          )}
        </div>
      </main>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
    </>
  );
};

export default FollowingPage;
