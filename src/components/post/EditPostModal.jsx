import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import axiosInstance from "@/apis/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
export const EditPostModal = (props) => {
  const { children } = props;
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(
    ({ id, ...data }) => axiosInstance.patch(`/posts/edit-post/${id}`, data),
    {
      onSuccess: () => {
        toast.success("Post updated successfully");
        queryClient.invalidateQueries(["detailPost"]);
        queryClient.invalidateQueries(["allposts"]);
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    },
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    await mutateAsync({ id: props.data.id, ...data });
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Your Post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} method="post">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                type="text"
                id="caption"
                name="caption"
                defaultValue={props.data.caption}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="mt-4 w-fit" type="submit">
              {isLoading ? (
                <div disabled className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                </div>
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
