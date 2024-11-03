import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { follow, unFollow } from "@/query/follow";
import { Loader2 } from "lucide-react";

const FollowButton = ({ profileId, initialIsFollowing = false }) => {
  const queryClient = useQueryClient();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const { mutateAsync: toggleFollow, isLoading } = useMutation(
    isFollowing ? unFollow : follow,
    {
      onSuccess: () => {
        toast.success(
          isFollowing ? "Unfollowed successfully" : "Followed successfully",
        );
        setIsFollowing(!isFollowing);
        queryClient.invalidateQueries({ queryKey: ["detailProfile"] });
        queryClient.invalidateQueries({
          queryKey: ["followStatus", profileId],
        });
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Failed to follow/unfollow",
        );
      },
    },
  );

  const handleToggleFollow = async () => {
    try {
      await toggleFollow(profileId);
    } catch (error) {
      console.error("Failed to toggle follow status:", error);
    }
  };

  return (
    <Button
      className={`mt-3 w-full ${isFollowing ? "bg-destrucive" : "bg-main"}`}
      disabled={isLoading}
      onClick={handleToggleFollow}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : isFollowing ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
};

export default FollowButton;
