import axiosInstance from "@/apis/axiosInstance";

export const getStories = async (username) => {
  const response = await axiosInstance.get(`/stories/${username}`);
  return response.data;
};
