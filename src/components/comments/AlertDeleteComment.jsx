import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axiosInstance from "@/apis/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const AlertDeleteComment = (props) => {
  const { children } = props;

  const id = props.data;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (id) => axiosInstance.delete(`/comments/delete-comment/${id}`),
    {
      onSuccess: () => {
        toast.success("Comment deleted successfully");
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries(["allposts"]);
        queryClient.invalidateQueries(["getsavedpost"]);

        queryClient.invalidateQueries(["detailPost"]);
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    },
  );

  const handleDelete = () => {
    mutate(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild variant={"noShadow"}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent aria-describedby="search-dialog-description">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-between gap-2">
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="mt-2 w-full bg-destrucive lg:mt-0"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteComment;
