import axiosInstance from "@/apis/axiosInstance";

export const like = async (id) => {
  const response = await axiosInstance.post(`/like/${id}`);
  return response.data;
};
