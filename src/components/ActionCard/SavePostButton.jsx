import { savePost } from "@/query/savedPost";
import { Button } from "../ui/button";
import { Bookmark, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const SavePostButton = (props) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, data, isSuccess } = useMutation({
    mutationKey: ["savePost"],
    mutationFn: () => {
      savePost(props.data.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ querykey: ["allposts"] });
      queryClient.invalidateQueries({ querykey: ["detailPost"] });

      if (!isSaved) {
        toast.success("Post saved successfully");
      } else {
        toast.error("Post unsaved successfully");
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    },
  });

  const handleToggleSavePost = async () => {
    const id = props.data.id;
    try {
      await mutateAsync(id);
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
    }
  };

  return (
    <Button
      onClick={handleToggleSavePost}
      className={`${isSuccess && data ? "bg-destrucive" : "bg-yellow"} `}
      size="sm"
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" />
        </div>
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </Button>
  );
};

export default SavePostButton;
