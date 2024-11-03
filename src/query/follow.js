import axiosInstance from "@/apis/axiosInstance";

export const getFollowers = async (username) => {
  const response = await axiosInstance.get(`/follow/${username}/followers`);
  const data = response.data;
  return data;
};

export const getFollowing = async (username) => {
  const response = await axiosInstance.get(`/follow/${username}/following`);
  const data = response.data;
  return data;
};

export const follow = async (id) => {
  const response = await axiosInstance.post(`/follow/${id}`);
  const data = response.data;
  return data;
};

export const unFollow = async (id) => {
  const response = await axiosInstance.delete(`/follow/unfollow/${id}`);
  const data = response.data;
  return data;
};
