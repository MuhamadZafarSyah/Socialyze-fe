import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader, MessageCircleMore } from "lucide-react";
import CommentDrawer from "../comments/CommentDrawer";
import { useScrollToHash } from "@/hooks/useScrollHash";
import noImg from "/images/no-image.png";
import { getTime } from "@/utils/getTime";
import { useQueryClient } from "@tanstack/react-query";
import LikeButton from "../ActionCard/LikeButton";
import { useSelector } from "react-redux";
import PostAction from "./PostAction";
import SavePostButton from "../ActionCard/SavePostButton";
import ShareDrawer from "../ActionCard/ShareDrawer";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

const PostCard = (props) => {
  const [loading, setLoading] = useState(true);

  const getUserLogin = useSelector((state) => state.authState.user);

  useScrollToHash();
  const queryClient = useQueryClient();

  function handleClickComment() {
    // invalidate to force refetch
    queryClient.invalidateQueries({ queryKey: ["allposts"] });
    queryClient.invalidateQueries({ queryKey: ["detailPost"] });
  }

  return (
    <div id={props.data.id} className="mx-auto max-w-sm p-4">
      <div className="flex w-full items-center justify-between">
        <Link
          to={`/${props.data.profile?.username}`}
          className="flex items-center gap-2"
        >
          <div>
            <Avatar className="!no-style center-center size-11">
              <AvatarImage
                className="size-10 rounded-full border border-border object-cover"
                src={props.data.profile?.avatar}
              />
              <AvatarFallback className="size-10 rounded-full border border-border object-cover text-xs">
                PFP
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-xs font-semibold">
              {props.data.profile?.username}
            </h1>
            <h2 className="text-[10px]">{props.data.profile?.name}</h2>
          </div>
        </Link>
        {getUserLogin.profileId === props.data.profile.id && (
          <PostAction data={props.data} />
        )}
      </div>
      <Card className="more-bold mx-auto mt-2 size-80 w-full max-w-md overflow-hidden">
        {loading && <Skeleton className="mx-auto size-full" />}
        <div className="relative h-full w-full bg-white">
          <img
            src={props.data.postImage || noImg}
            alt="Post Image"
            layout="fill"
            onLoad={() => setLoading(false)}
            className="h-full w-full object-cover"
          />
        </div>
      </Card>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LikeButton data={props.data} />
          <CommentDrawer data={props.data}>
            <Button
              onClick={handleClickComment}
              className="w-fit bg-yellow active:bg-destrucive"
              size="sm"
            >
              <MessageCircleMore className="h-4 w-4" />
            </Button>
          </CommentDrawer>
          <ShareDrawer data={props.data} />
        </div>
        <SavePostButton data={props.data} />
      </div>

      <div className="between-center mt-4 text-xs">
        <h1 className="font-semibold">{props.data._count?.likes} Likes</h1>
        <h2> {getTime(props.data.createdAt)}</h2>
      </div>

      <div className="mt-2">
        <h1 className="text-xs font-semibold">
          {props.data.profile?.username}
        </h1>
        <h2 className="text-[10px]">{props.data.caption}</h2>
      </div>
    </div>
  );
};

export default PostCard;
