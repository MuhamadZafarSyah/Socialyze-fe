import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/apis/axiosInstance";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/auth/authSlice";
import ImageCropModal from "@/components/profile/ImageCropModal.jsx";
import { CameraIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EditProfileModal = (props) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file) => {
      dispatch(setLoading(true));
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
      dispatch(setLoading(true));
      const response = await axiosInstance.put(
        "/profile/edit-profile",
        profileData,
      );
      return response.data;
    },
    onSuccess: (response) => {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      user.username = response.data.username;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setLoading(false));
      navigate(`/${response.data.username}`);
      toast.success("Success Edit Profile");
      queryClient.invalidateQueries({ queryKey: ["detailProfile"] });
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
        link: data.link,
        category: data.category,
        gender: data.gender,
        ...(avatarPath && { avatar: avatarPath }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const isLoadingRequest = useSelector((state) => state.authState.isLoading);

  const getAvatar = props.data.avatar;

  const [preview, setPreview] = useState(getAvatar);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[325px] rounded-md py-4 lg:max-w-[425px]">
        <form method="post" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <Avatar className="no-style relative z-10 mx-auto size-28">
            <AvatarImage
              className="relative mx-auto size-28 border-2 border-border object-cover"
              src={preview}
            />
            <AvatarFallback className="mx-auto size-28 border-2 border-border">
              PFP
            </AvatarFallback>

            <ImageCropModal
              className="absolute left-40 -mt-10"
              updateAvatar={updateAvatar}
            >
              <Button variant="default">
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                required
                name="name"
                defaultValue={props.data.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue={props.data.username}
                name="username"
                required
                className="col-span-3 lowercase"
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                    e.target.value += "_";
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Link
              </Label>
              <Input
                id="link"
                name="link"
                defaultValue={props.data.link}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select name="category" defaultValue={props.data.category}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={props.data.category} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="Atlet">Atlet</SelectItem>
                    <SelectItem value="Programmer">Programmer</SelectItem>
                    <SelectItem value="Anthusias">Anthusias</SelectItem>
                    <SelectItem value="Desainer">Desainer</SelectItem>
                    <SelectItem value="Gamer">Gamer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Textarea
                required
                className="col-span-3"
                id="bio"
                defaultValue={props.data.bio}
                name="bio"
                autoComplete="bio"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoadingRequest}
            >
              {isLoadingRequest ? (
                <Loader2 size={20} className="animate-spin" color="white" />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>{" "}
        </form>
      </DialogContent>
    </Dialog>
  );
};
