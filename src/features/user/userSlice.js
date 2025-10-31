import { createSlice } from "@reduxjs/toolkit";
import { UserInfoStorage } from "@/utils/localStorage";
import PATH from "@/configs/PATH";

const initialState = {
  user: UserInfoStorage.getUserInfo() || null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      UserInfoStorage.saveUserInfo(action.payload);
    },
    logoutUser: (state) => {
      state.user = null;
      UserInfoStorage.removeUserInfo();
      window.location.href = PATH.LOGIN;
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions;
export const curUser = (state) => state.user.user;
export default userSlice.reducer;