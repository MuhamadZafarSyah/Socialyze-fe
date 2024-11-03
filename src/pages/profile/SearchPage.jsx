import axiosInstance from "@/apis/axiosInstance";
import Sidebar from "@/components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FollowSkeleton from "@/components/profile/FollowSkeleton";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import FollowCard from "@/components/profile/FollowCard";
const SearchPage = () => {
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["searchuser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/profile/users");
      return response.data;
    },
  });

  const getUserLogin = useSelector((state) => state.authState.user);

  return (
    <>
      <div className="sticky top-0 z-20 mx-auto w-full border-b-2 border-border bg-white">
        <header className="top-0 mx-auto flex h-fit max-w-screen-lg items-center justify-between bg-white pr-4">
          <div className="flex items-center gap-2 p-4">
            <Link to={`/`} className="text-lg font-semibold">
              <ArrowLeft />
            </Link>
            <span className="text-lg font-semibold">Search for user</span>
          </div>
          <Sidebar data={getUserLogin.username} />
        </header>
      </div>
      <main className="relative mx-auto max-w-screen-sm overflow-hidden overscroll-none">
        <div className="mt-4 flex flex-col gap-3 overflow-hidden overscroll-none px-4">
          {isSuccess && data.data.length > 0 ? (
            <Command className="w-full overflow-hidden overscroll-none">
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {data.data.map((user) => (
                  <CommandItem
                    key={user.id}
                    className="mt-1 overflow-hidden overscroll-none p-2"
                  >
                    <FollowCard className="bg-main" data={user} />
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          ) : (
            <div className="center-center">
              <span>There's no one</span>
            </div>
          )}
          {isLoading && (
            <>
              <FollowSkeleton />
              <FollowSkeleton />
              <FollowSkeleton />
            </>
          )}
        </div>
      </main>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
    </>
  );
};

export default SearchPage;
