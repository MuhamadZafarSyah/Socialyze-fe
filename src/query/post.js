import axiosInstance from "@/apis/axiosInstance";

export const getAllPosts = async () => {
  const response = await axiosInstance.get("/posts/allPosts");

  const data = response.data;
  return data;
};

export const editPost = async (id, mama) => {
  const response = await axiosInstance.put(`/posts/edit-post/${id}`, mama);
  const data = response.data;
  return data;
};

export const detailPost = async (username) => {
  const response = await axiosInstance.get(`/posts/detail-post/${username}`);
  const data = response.data;
  return data;
};
