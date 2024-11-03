import axiosInstance from "@/apis/axiosInstance";
import ImageStoriesCropModal from "@/components/stories/ImageStoriesCropModal";
import Sidebar from "@/components/Sidebar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { setLoading } from "@/redux/auth/authSlice";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateStoriesPage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const getUsernameLogin = useSelector(
    (state) => state.authState.user.username,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState();

  // Mutasi untuk upload image
  const uploadStoryImageMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("snapImage", file);
      const response = await axiosInstance.post(
        "/stories/upload-snap-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (!response.data.data?.path) {
        throw new Error("Failed to upload image");
      }
      return response.data.data.path;
    },
  });

  // Mutasi untuk create story
  const createStoryMutation = useMutation({
    mutationFn: async (postData) => {
      const response = await axiosInstance.post("/stories", postData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allposts"] });
      toast.success("Success Create Stories");
      navigate(`/`);
    },
    onError: (error) => {
      dispatch(setLoading(false));
      const errorMessage =
        error?.response?.data?.message || error?.response?.data?.error;
      toast.error(errorMessage || "Failed to create story");
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const fileInput = e.target.snapImage;
      const file = fileInput.files[0];

      if (!file) {
        toast.error("Please select an image");
        return;
      }

      // Upload image first
      const imagePath = await uploadStoryImageMutation.mutateAsync(file);

      if (!imagePath) {
        throw new Error("Failed to upload image");
      }

      // Create story with uploaded image path
      await createStoryMutation.mutateAsync({
        snapImage: imagePath,
      });
    } catch (error) {
      if (error.response?.data?.error === "Timeout (control socket)") {
        toast.error("Harap ganti jaringan anda");
      } else {
        const errorMessage =
          error?.response?.data?.message || error?.response?.data?.error;
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const updateStoryImage = (objectUrl) => {
    setPreview(objectUrl);
  };

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
            <span className="text-lg font-semibold">Create Stories</span>
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
            <Label htmlFor="snapImage">Stories Image</Label>
            <ImageStoriesCropModal
              updateStoriesImage={updateStoryImage}
              className="!static mt-6 rounded-lg"
            >
              <Card className="center-center m-auto size-80 w-full bg-white !p-0 !px-0">
                <Avatar className="no-style relative z-10 mx-auto flex size-fit h-full items-center justify-center">
                  <AvatarImage
                    className="relative mx-auto size-80 border-2 border-border object-cover"
                    src={preview}
                  />
                  <AvatarFallback>Your Story Image</AvatarFallback>
                  <input
                    type="file"
                    name="snapImage"
                    id="snapImage"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </Avatar>
              </Card>
            </ImageStoriesCropModal>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !preview}
          >
            {isSubmitting ||
            uploadStoryImageMutation.isLoading ||
            createStoryMutation.isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Post"
            )}
          </Button>
        </form>
      </main>
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="fixed left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-yellow opacity-20 blur-[100px]"></div>
      </div>
      {/* Background div tetap sama */}
    </div>
  );
};

export default CreateStoriesPage;
