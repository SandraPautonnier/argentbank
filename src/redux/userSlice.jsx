import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: localStorage.getItem("{firstName}") || "",
  lastName: localStorage.getItem("{lastName}") || "",
  userName: localStorage.getItem("{userName}") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
  },
});

export const { userProfile, updateUserName } = userSlice.actions;
export default userSlice.reducer;
