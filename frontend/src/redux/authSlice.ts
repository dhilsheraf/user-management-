import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || 'null')
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user",JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;