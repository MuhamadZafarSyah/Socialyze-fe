import axiosInstance from "@/apis/axiosInstance";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { setLoading } from "@/redux/auth/authSlice";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import ImageCropModal from "@/components/profile/ImageCropModal";
import { useNavigate } from "react-router-dom";
import { CameraIcon, Loader2 } from "lucide-react";

const CreateProfilePage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await axiosInstance.post(
        "/profile/upload-profile-picture",
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

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData) => {
      const response = await axiosInstance.post(
        "/profile/create-profile",
        profileData,
      );
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      const user = JSON.parse(localStorage.getItem("user")) || {};
      user.profileId = response.data.id;
      user.username = response.data.username;
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Success Make Profile");

      dispatch(setLoading(false));
      window.location.href = "/";
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
      let avatarPath = null;

      // Upload avatar jika ada
      if (data.avatar && data.avatar.size > 0) {
        avatarPath = await uploadAvatarMutation.mutateAsync(data.avatar);
      }

      const modifiedString = data.username.toLowerCase().replace(/\s+/g, "_");

      // Update profile
      await updateProfileMutation.mutateAsync({
        name: data.name,
        username: modifiedString,
        bio: data.bio,
        gender: data.gender,
        ...(avatarPath && { avatar: avatarPath }),
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

  const updateAvatar = (objectUrl) => {
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
    <form
      onSubmit={onSubmit}
      method="post"
      className="relative z-10 mb-6 flex h-screen w-full flex-col items-center bg-white pt-6"
    >
      <Avatar className="no-style relative z-10 mx-auto size-28">
        <AvatarImage
          className="relative mx-auto size-28 border-2 border-border object-cover"
          src={preview}
        />
        <AvatarFallback className="mx-auto size-28 border-2 border-border">
          PFP
        </AvatarFallback>

        <ImageCropModal
          className="absolute !left-16 -mt-10"
          updateAvatar={updateAvatar}
        >
          <Button>
            <CameraIcon className="h-full w-full" />
          </Button>
        </ImageCropModal>
        <input
          type="file"
          onChange={handleFileChange}
          name="avatar"
          id="avatar"
          className="hidden"
        />
      </Avatar>
      <Card className="mt-6 min-w-80 rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="">Buat Profile Kamu </CardTitle>
          <CardDescription>Buat profile kamu semenarik mungkin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4 text-start">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="enter your name"
                name="name"
                required
                autoComplete="name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Enter your username"
                name="username"
                required
                className="col-span-3 lowercase"
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                    e.target.value += "_";
                  }
                }}
                autoComplete="username"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender">
                <SelectTrigger>
                  <SelectValue placeholder="Gender Kamu" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="MALE">MALE</SelectItem>
                    <SelectItem value="FEMALE">FEMALE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                required
                className="col-span-3"
                id="bio"
                name="bio"
                placeholder="add your profile bio"
                autoComplete="bio"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoadingRequest}>
            {isLoadingRequest ? (
              <Loader2 className="animate-spin" size={20} color="white" />
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </Card>
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
    </form>
  );
};

export default CreateProfilePage;
