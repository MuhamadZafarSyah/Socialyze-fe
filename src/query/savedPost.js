import axiosInstance from "@/apis/axiosInstance";

export const getSavePost = async () => {
  const response = await axiosInstance.get("/save");
  return response.data;
};

export const savePost = async (id) => {
  const response = await axiosInstance.post(`/save/${id}`);
  return response.data;
};
