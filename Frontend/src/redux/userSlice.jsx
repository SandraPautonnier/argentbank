import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("token") || localStorage.getItem('token') || "",
  isAuthenticated: !!(localStorage.getItem("token") || sessionStorage.getItem("token")), /*sessionStorage.getItem("token") ? true : false,*/
  firstName: sessionStorage.getItem("{firstName}") || localStorage.getItem('{firstName}') || "",
  lastName: sessionStorage.getItem("{lastName}") || localStorage.getItem('{lastName}') || "",
  userName: sessionStorage.getItem("{userName}") || localStorage.getItem('{userName}') || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, remember } = action.payload;

      state.token = token;
      state.isAuthenticated = true;

      if (remember) {
        localStorage.setItem("token", token); 
        sessionStorage.setItem("token", token); 
      } else {
        sessionStorage.setItem("token", token); 
      }
    },
    userProfile: (state, action) => {
      const { userName, firstName, lastName, remember } = action.payload;

      state.firstName = firstName;
      state.lastName = lastName;
      state.userName = userName;

      if (remember) {
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("userName", userName);
        sessionStorage.setItem("firstName", firstName);
        sessionStorage.setItem("lastName", lastName);
        sessionStorage.setItem("userName", userName);
      } else {
        sessionStorage.setItem("firstName", firstName);
        sessionStorage.setItem("lastName", lastName);
        sessionStorage.setItem("userName", userName);
      }
    },
    updateUserName: (state, action) => {
      const { userName } = action.payload;
      state.userName = userName;
      if (localStorage.getItem("userName")) {
        localStorage.setItem("userName", userName);
      } else {
        sessionStorage.setItem("userName", userName);
      }
    },
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      state.firstName = "";
      state.lastName = "";
      state.userName = "";

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("firstName");
      sessionStorage.removeItem("lastName");
      sessionStorage.removeItem("userName");

      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("userName");
    },
  },
});

export const { loginSuccess, userProfile, updateUserName, logout } = userSlice.actions;
export default userSlice.reducer;
