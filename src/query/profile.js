import axiosInstance from "@/apis/axiosInstance";

export const editProfile = async (data) => {
  const response = await axiosInstance.put("/profile/edit-profile", data);
  return response.data;
};

export const detailProfile = async (username) => {
  const response = await axiosInstance.get(`/profile/${username}`);
  const profile = response.data;
  return profile;
};
