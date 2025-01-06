import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("{token}") || "", // Récupère le token depuis le stockage local
  firstName: localStorage.getItem("firstName") || "",
  lastName: localStorage.getItem("lastName") || "",
  userName: localStorage.getItem("userName") || "",
  isAuthenticated: localStorage.getItem("{token}") ? true : false, // Vérifie si l'utilisateur est authentifié
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, remember, user } = action.payload;

      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("token", token);
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("lastName", user.lastName);
      localStorage.setItem("userName", user.userName);

      // Si "Remember Me" est coché, stocke le token dans sessionStorage
      if (remember) {
        sessionStorage.setItem("token", token);
      }
    },
    updateUserName: (state, action) => {
        state.userName = action.payload;
  
        // Mets à jour dans localStorage
        localStorage.setItem('userName', userName);
    },
    logout: (state) => {
      state.token = "";
      state.firstName = '';
      state.lastName = '';
      state.userName = '';
      state.isAuthenticated = false;

      // Supprime le token du stockage local
      localStorage.removeItem("token");
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('userName');
    },
  },
});

export const { loginSuccess, updateUserName, logout } = userSlice.actions;
export default userSlice.reducer;
