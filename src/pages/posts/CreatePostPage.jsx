import axiosInstance from "@/apis/axiosInstance";
import ImagePostCropModal from "@/components/post/ImagePostCropModal";
import Sidebar from "@/components/Sidebar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { setLoading } from "@/redux/auth/authSlice";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreatePostPage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const getUsernameLogin = useSelector(
    (state) => state.authState.user.username,
  );

  const uploadPostImageMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("postImage", file);
      const response = await axiosInstance.post(
        "/posts/upload-post-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data.data?.path;
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData) => {
      const response = await axiosInstance.post("/posts/create-post", postData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["detailProfile"] });
      dispatch(setLoading(false));
      toast.success("Success Create Posts");
      navigate(`/${getUsernameLogin}`);
    },
    onError: (error) => {
      dispatch(setLoading(false));
      if (error.response?.data?.error === "Timeout (control socket)") {
        toast.error("Harap ganti jaringan anda");
      } else {
        const errorMessage =
          error?.response?.data?.message || error?.response?.data?.error;
        toast.error(errorMessage);
      }
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      dispatch(setLoading(true));
      let postImagePath = null;

      if (data.postImage && data.postImage.size > 0) {
        postImagePath = await uploadPostImageMutation.mutateAsync(
          data.postImage,
        );
      }

      await createPostMutation.mutateAsync({
        caption: data.caption,
        ...(postImagePath && { postImage: postImagePath }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isLoadingRequest = useSelector((state) => state.authState.isLoading);

  const [preview, setPreview] = useState();
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const updatePostImage = (objectUrl) => {
    setPreview(objectUrl);
  };

  // Cleanup function for memory management
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);
  return (
    <div className="h-dvh overflow-auto pb-4">
      <div className="sticky top-0 z-30 mx-auto w-full border-b-2 border-border bg-white">
        <header className="top-0 mx-auto flex h-fit max-w-screen-lg items-center justify-between bg-white pr-4">
          <div className="flex items-center gap-2 p-4">
            <Link to={`/${getUsernameLogin}`} className="text-lg font-semibold">
              <ArrowLeft />
            </Link>
            <span className="text-lg font-semibold">Create Post</span>
          </div>
          <Sidebar data={getUsernameLogin} />
        </header>
      </div>
      <main className="relative mx-auto max-w-screen-sm">
        <form
          method="post"
          onSubmit={onSubmit}
          className="mt-4 flex flex-col gap-6 px-6"
        >
          <div>
            <Label htmlFor="Post Image">Post Image</Label>
            <ImagePostCropModal
              updatePostImage={updatePostImage}
              className="!static mt-6 rounded-lg"
            >
              <Card className="center-center m-auto size-80 w-full bg-white !p-0 !px-0">
                <Avatar className="no-style relative z-10 mx-auto flex size-fit h-full items-center justify-center">
                  <AvatarImage
                    className="relative mx-auto size-80 border-2 border-border object-cover"
                    src={preview}
                  />
                  <AvatarFallback>Your Post Image</AvatarFallback>
                  <input
                    type="file"
                    name="postImage"
                    id="postImage"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Avatar>
              </Card>
            </ImagePostCropModal>
          </div>
          <div>
            <Label htmlFor="caption">Caption</Label>
            <Textarea type="text" id="caption" name="caption" required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoadingRequest}>
            {isLoadingRequest ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Post"
            )}
          </Button>
        </form>
      </main>
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="fixed left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
    </div>
  );
};

export default CreatePostPage;
