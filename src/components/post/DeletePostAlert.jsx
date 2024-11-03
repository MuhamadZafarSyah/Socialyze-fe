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
const DeletePostAlert = (props) => {
  const { children } = props;

  const id = props.data.id;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (id) => axiosInstance.delete(`/posts/delete-post/${id}`),
    {
      onSuccess: () => {
        toast.success("Post deleted successfully");
        queryClient.invalidateQueries(["detailPost"]);
        queryClient.invalidateQueries(["detailProfile"]);
        queryClient.invalidateQueries(["allposts"]);
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-between gap-2">
          <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          {isLoading && (
            <AlertDialogAction
              className="mt-2 w-full bg-destrucive lg:mt-0"
              disabled
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          )}
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

export default DeletePostAlert;
