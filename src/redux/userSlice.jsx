import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: [
        {firstName: localStorage.getItem("{firstName}") || ""},
        {lastName: localStorage.getItem("{lastName}") || ""},
        {userName: localStorage.getItem("{userName}") || ""}
    ],
    reducers: {
        userProfile: (state) => {
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
    }
});

export const { userProfile, updateUserName } = userSlice.actions;
export default userSlice.reducer;