import { like } from "@/query/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { useDispatch } from "react-redux";

const LikeButton = (props) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: toggleLike,
    isLoading,
    data,
    isSuccess,
  } = useMutation({
    mutationKey: ["like"],
    mutationFn: () => like(props.data.id),
    onSuccess: (response) => {
      console.log(response);
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
      size="sm"
      disabled={isLoading}
      className={`${isSuccess && data ? "bg-destrucive" : "bg-yellow"} `}
    >
      <HeartIcon className="h-4 w-4" />
    </Button>
  );
};

export default LikeButton;
