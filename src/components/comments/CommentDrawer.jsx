import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getTime } from "@/utils/getTime";
import { Input } from "../ui/input";
import { Loader2, SendHorizonal, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/apis/axiosInstance";
import AlertDeleteComment from "./AlertDeleteComment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const CommentDrawer = ({ children, data }) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(
    ({ id, ...comment }) =>
      axiosInstance.post(`/comments/create-comment/${id}`, comment),
    {
      onSuccess: () => {
        toast.success("Comment added successfully");
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["allposts"]);
        queryClient.invalidateQueries(["detailPost"]);
        queryClient.invalidateQueries(["getsavedpost"]);
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    },
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = Object.fromEntries(formData);

    await mutateAsync({ id: data.id, ...comment });

    e.target.reset();
  };

  const getUser = useSelector((state) => state.authState.user.profileId);

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-3/4" aria-describedby="comment-section">
        <DrawerTitle className="mt-2 px-4 text-center">Comments</DrawerTitle>
        <div className="mx-auto w-[300px]"></div>
        <ScrollArea className="mx-auto h-full w-full rounded-base p-4 lg:max-w-screen-sm">
          <div className="flex flex-col gap-4">
            {data.comments.length === 0 && <p>No comments </p>}
            {data.comments.map((item) => (
              <div id={item.id} key={item.id}>
                <div className="flex items-center justify-between pr-2">
                  <Link
                    to={`/${item.profile.username}`}
                    className="flex items-center gap-2"
                  >
                    <div>
                      <Avatar className="!no-style center-center !size-11 bg-black">
                        <AvatarImage
                          className="size-10 rounded-full border border-border object-cover"
                          src={item.profile.avatar}
                        />
                        <AvatarFallback className="size-10 rounded-full border border-border object-cover text-xs">
                          PFP
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <h1 className="text-xs font-semibold">
                        {item.profile.username}
                        <span className="ml-2 text-gray-500">
                          {getTime(item.createdAt)}
                        </span>
                      </h1>
                      <h2 className="text-[10px]">{item.profile.name}</h2>
                    </div>
                  </Link>

                  {getUser === item.profile.id ? (
                    <AlertDeleteComment data={item.id}>
                      <Button
                        variant="noShadow"
                        className="!size-8 rounded-full bg-destrucive p-0"
                      >
                        <Trash2 className="!m-0 size-4 !p-0" />
                      </Button>
                    </AlertDeleteComment>
                  ) : null}
                </div>

                <p className="mt-2 text-xs font-light">{item.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        <form
          onSubmit={onSubmit}
          method="post"
          className="mx-auto flex w-full items-center justify-between gap-2 px-4 py-2 lg:max-w-screen-md"
        >
          <Input
            placeholder="Leave a comment"
            name="content"
            required
            className="bottom-0 w-full rounded-full p-4"
          />

          <Button
            className="w-fit rounded-full bg-bg p-[11px]"
            variant="noShadow"
            type="submit"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
              </div>
            ) : (
              <SendHorizonal className="size-4" />
            )}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentDrawer;
