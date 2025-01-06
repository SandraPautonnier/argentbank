import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('{token}') || '', // Récupère le token depuis le stockage local
  isAuthenticated: localStorage.getItem('token') ? true : false, // Vérifie si l'utilisateur est authentifié
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, remember } = action.payload;

      state.token = token;
      state.isAuthenticated = true;

      // Si "Remember Me" est coché, stocke le token dans localStorage
      if (remember) {
        localStorage.setItem('token', token);
      }
    },
    logout: (state) => {
      state.token = '';
      state.isAuthenticated = false;

      // Supprime le token du stockage local
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
