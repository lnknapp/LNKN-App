import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import TokenData from "../../models/user/TokenData";
import { UserInfo } from "../../models";

interface AuthenticationState {
  userToken: string | null;
  userInfo: UserInfo | null;
  tokenData: TokenData | null;
  isSignedIn: boolean;
}

const initialState: AuthenticationState = {
  userToken: null,
  userInfo: null,
  tokenData: null,
  isSignedIn: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.userToken = action.payload;
    },
    clearToken: (state) => {
      state.userToken = null;
    },
    setTokenData: (state, action) => {
      state.tokenData = action.payload;
    },
    clearTokenData: (state) => {
      state.tokenData = null;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
    setIsLoggedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
  },
});

export const {
  setToken, clearToken,
  setTokenData, clearTokenData,
  setUserInfo, clearUserInfo,
  setIsLoggedIn
} = authenticationSlice.actions;
export const getUserToken = () => (state: RootState) => state.authentication.userToken;
export default authenticationSlice.reducer;
