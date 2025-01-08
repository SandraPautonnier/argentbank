import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: localStorage.getItem("{token}") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, remember } = action.payload;

      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("token", token);

      if (remember) {
        sessionStorage.setItem("token", token);
      }
    },
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;

      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
