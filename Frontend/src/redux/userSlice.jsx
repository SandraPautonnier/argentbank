import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || "",
  isAuthenticated: localStorage.getItem("token") ? true : false,
  firstName: localStorage.getItem("{firstName}") || "",
  lastName: localStorage.getItem("{lastName}") || "",
  userName: localStorage.getItem("{userName}") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, remember } = action.payload;

      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("token", token);

      /*if (remember) {
        sessionStorage.setItem("token", token);
      } */
    },
    userProfile: (state, action) => {
      const { userName, firstName, lastName } = action.payload;

      state.firstName = firstName;
      state.lastName = lastName;
      state.userName = userName;

      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("userName", userName);
    },
    updateUserName: (state, action) => {
      const { userName } = action.payload;
      state.userName = userName;
      localStorage.setItem("userName", userName);
    },
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      state.firstName = "";
      state.lastName = "";
      state.userName = "";

      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("userName");
    },
  },
});

export const { loginSuccess, userProfile, updateUserName, logout } = userSlice.actions;
export default userSlice.reducer;
