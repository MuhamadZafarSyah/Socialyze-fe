import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    registerUser: (state, action) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/create-profile";
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { loginUser, logoutUser, registerUser, setLoading } =
  userSlice.actions;

export default userSlice.reducer;
