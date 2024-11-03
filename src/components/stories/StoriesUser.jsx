import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import ReactInstaStories from "react-insta-stories";
import axiosInstance from "@/apis/axiosInstance";
import { Skeleton } from "../ui/skeleton";
import SkeletonStories from "./SkeletonStories";

const UserAvatar = ({ avatar, username, onClick }) => (
  <Avatar
    onClick={onClick}
    className="!size-18 cursor-pointer border-2 border-border"
  >
    <AvatarImage
      src={avatar}
      className="w-full rounded-full object-cover shadow-md shadow-secondaryBlack"
      alt={username}
    />
    <AvatarFallback>PFP</AvatarFallback>
    <span className="mt-2 text-center text-[11px]">
      {username.slice(0, 10)}
    </span>
  </Avatar>
);

const StoriesModal = ({ isLoading, data, onClose }) => {
  const isLaptop = window.innerWidth > 768;

  // Disable scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const [currentStory, setCurrentStory] = useState(0);
  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      <div
        className={`fixed z-[9999] ${
          isLaptop
            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            : "inset-0"
        }`}
      >
        {isLoading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ReactInstaStories
            stories={data}
            defaultInterval={2500}
            onStoryEnd={(s, st) => {
              const nextStory = currentStory + 1;
              if (nextStory < data.length) {
                setCurrentStory(nextStory);
              }
            }}
            width={isLaptop ? 360 : window.innerWidth}
            height={isLaptop ? 710 : window.innerHeight}
            onAllStoriesEnd={onClose}
          />
        )}
      </div>
    </div>
  );
};

const StoriesUser = ({ data: { username, avatar } }) => {
  const [showInsta, setShowInsta] = useState(false);

  const { data, isLoading } = useQuery(["stories", username], async () => {
    const response = await axiosInstance.get(`/stories/${username}`);
    return response.data;
  });

  if (isLoading) {
    return <SkeletonStories />;
  }

  return (
    <>
      <UserAvatar
        avatar={avatar}
        username={username}
        onClick={() => setShowInsta(true)}
      />

      {showInsta && (
        <StoriesModal
          isLoading={isLoading}
          data={data}
          onClose={() => setShowInsta(false)}
        />
      )}
    </>
  );
};

export default StoriesUser;
