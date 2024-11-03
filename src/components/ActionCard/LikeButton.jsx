import { like } from "@/query/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { HeartIcon, Loader2 } from "lucide-react";

const LikeButton = (props) => {
  const queryClient = useQueryClient();
  const isLiked = props.data.isLiked;

  const { mutateAsync: toggleLike, isLoading } = useMutation({
    mutationKey: ["like"],
    mutationFn: () => like(props.data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ querykey: ["allposts"] });
      queryClient.invalidateQueries({ querykey: ["detailPost"] });
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    },
  });

  const handleToggleLike = async () => {
    const id = props.data.id;
    try {
      await toggleLike(id);
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
    }
  };
  return (
    <Button
      onClick={handleToggleLike}
      className={`${isLiked ? "bg-destrucive" : "bg-yellow"} `}
      size="sm"
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" />
        </div>
      ) : (
        <HeartIcon className="h-4 w-4" />
      )}
    </Button>
  );
};

export default LikeButton;
