import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"

interface IUser {
  id: number;
  name: string;
  mobile?: string;
  email?: string;
  role?: string;
  profile_pic?: string;
}

interface AuthState {
  user: IUser | null;
  isLogin: boolean;
}

const initialState: AuthState = {
  user: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    loginSuccess: (
      state,
      action: PayloadAction<{ user: IUser; isLogin: boolean }>
    ) => {
      state.user = action.payload.user;
      state.isLogin = action.payload.isLogin;
    },
    
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;