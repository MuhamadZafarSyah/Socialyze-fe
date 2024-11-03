import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import styles from "../../AnimatedButtons.module.css";

import {
  ArrowLeft,
  Camera,
  CircleFadingPlus,
  LinkIcon,
  Loader,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { detailProfile } from "@/query/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThumbnailPostCard from "@/components/post/ThumbnailPostCard";
import { useSelector } from "react-redux";
import { EditProfileModal } from "@/components/profile/EditProfileModal";
import FollowButton from "@/components/profile/FollowButton";
import noPost from "/images/no-post.png";
import Sidebar from "@/components/Sidebar";
const DetailProfilePage = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ["detailProfile", username],
    queryFn: () => detailProfile(username),
    staleTime: 1000 * 60, // 1 menit
  });

  if (error) {
    window.location.href = "/";
  }

  const ProfileIdloginuser = useSelector((state) => state.authState.user);

  return (
    <>
      {isLoading && (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader className="size-12 animate-spin" color="blue" />
        </div>
      )}
      {isSuccess && data && (
        <>
          <div className="sticky top-0 z-20 mx-auto w-full border-b-2 border-border bg-white">
            <header className="top-0 mx-auto flex h-fit max-w-screen-lg items-center justify-between bg-white pr-4">
              <div className="flex items-center gap-2 p-4">
                <Link to="/" className="text-lg font-semibold">
                  <ArrowLeft />
                </Link>
                <span className="text-lg font-semibold">
                  @{isSuccess && data.data.username}
                </span>
              </div>
              <Sidebar data={ProfileIdloginuser.username} />
            </header>
          </div>
          <main className="relative mx-auto max-w-screen-sm">
            <section className="relative mx-auto h-dvh max-w-screen-sm">
              <div className="py-5">
                <div className="flex w-full gap-4 p-4">
                  <Avatar className="size-28">
                    {data.data.avatar && (
                      <AvatarImage
                        loading="lazy"
                        onLoad={() => setLoading(false)}
                        className="w-full rounded-full object-cover shadow-md shadow-secondaryBlack"
                        src={data.data.avatar}
                      />
                    )}
                    <AvatarFallback>PFP</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col font-bold">
                    <span>@{data.data.username}</span>
                    <h2>{data.data.name}</h2>

                    {ProfileIdloginuser.profileId === data.data.id ? (
                      <div>
                        <EditProfileModal data={data.data} />
                      </div>
                    ) : (
                      <FollowButton
                        profileId={data.data.id}
                        initialIsFollowing={data.data.isFollowing}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col px-4">
                  <span className="text-gray-500">{data.data.category}</span>
                  {data.data.link && (
                    <a
                      href={`//${data.data.link}`}
                      className="flex items-center gap-1 text-blue-500 underline"
                    >
                      <LinkIcon size={15} /> {data.data.link}
                    </a>
                  )}
                  <p>{data.data.bio}</p>
                </div>
                <div className="my-4 flex items-center justify-center gap-4 px-4">
                  <div className="center-center w-28 rounded-md border-2 border-border bg-[#ebee88] p-2 text-center lg:p-2">
                    <h1 className="text-lg font-bold">
                      {data.data._count.posts}
                    </h1>
                    <h2>Posts</h2>
                  </div>
                  <Link
                    to={`/${username}/followers`}
                    className="center-center w-28 rounded-md border-2 border-border bg-destrucive p-2 text-center lg:p-2"
                  >
                    <h1 className="text-lg font-bold">
                      {data.data._count.followers}
                    </h1>
                    <h2>Followers</h2>
                  </Link>
                  <Link
                    to={`/${username}/following`}
                    className="center-center w-28 rounded-md border-2 border-border bg-[#88d5ee] p-2 text-center lg:p-2"
                  >
                    <h1 className="text-lg font-bold">
                      {" "}
                      {data.data._count.following}
                    </h1>
                    <h2>Following</h2>
                  </Link>
                </div>
                <hr className="h-0.5 !w-full bg-black" />
                <div className="mt-4 grid grid-cols-3 gap-[6px] gap-y-3 px-2 lg:grid-cols-4">
                  {data.data.posts &&
                    data.data.posts.map((post) => (
                      <Link
                        key={post.id}
                        to={`/detail-post/${username}#${post.id}`}
                      >
                        <ThumbnailPostCard data={post} />
                      </Link>
                    ))}
                </div>
                {data.data.posts.length === 0 && (
                  <div className="mx-auto h-fit w-full pt-4">
                    <img
                      className="mx-auto size-10/12 md:size-2/3 lg:size-1/2"
                      src={noPost}
                      alt="NO-POST"
                    />
                  </div>
                )}
              </div>
              {ProfileIdloginuser.profileId === data.data.id && (
                <div className="relative">
                  <Button
                    size="icons"
                    onClick={() => setOpen(!open)}
                    className="fixed bottom-4 right-4 w-fit rounded-full p-3 lg:right-1/4"
                  >
                    <Plus
                      className={`size-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                    />
                  </Button>

                  <div className={styles.buttonContainer}>
                    <Link to="/posts/create">
                      <Button
                        size="icons"
                        className={`fixed bottom-16 right-12 w-fit rounded-full bg-destrucive p-3 lg:right-[27%] ${styles.button} ${
                          styles.button1
                        } ${open ? styles.buttonShow : styles.buttonHide}`}
                      >
                        <Camera className="size-4" />
                      </Button>
                    </Link>
                    <Link to="/stories/create">
                      <Button
                        size="icons"
                        className={`fixed bottom-3 right-[4.5rem] w-fit rounded-full bg-yellow p-3 lg:right-[29%] ${styles.button} ${
                          styles.button2
                        } ${open ? styles.buttonShow : styles.buttonHide}`}
                      >
                        <CircleFadingPlus className="size-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </main>
        </>
      )}
      {error && <p>Error: {error.message}</p>}
      <div className="fixed bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_70%,transparent_110%)]"></div>
    </>
  );
};

export default DetailProfilePage;
