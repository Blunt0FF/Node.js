import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRegisterUser,
  type IRegisterData,
} from "./services/fetchRegisterUser";
import { fetchLoginUser } from "./services/fetchLoginUser";

interface IAuthSlice {
  error: null | string;
  loading: boolean;
  data: any;
  token: null | string;
  isAuth: boolean;
}

const initialState: IAuthSlice = {
  error: null,
  loading: false,
  data: null,
  token: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRegisterUser.pending, (state) => {
      state.error = null;
      state.data = null;
      state.loading = true;
    });
    builder.addCase(fetchRegisterUser.rejected, (state, action) => {
      state.data = null;
      state.loading = false;
      state.error = action.type;
    });
    builder.addCase(
      fetchRegisterUser.fulfilled,
      (state, action: PayloadAction<IRegisterData | undefined>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload?.user;
      }
    );
    builder.addCase(fetchLoginUser.pending, (state) => {
      state.error = null;
      state.data = null;
      state.loading = true;
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.data = null;
      state.loading = false;
      // state.error = action.error?.message
    });
    builder.addCase(
      fetchLoginUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload.token;
        state.isAuth = true;
      }
    );
  },
});

export default authSlice.reducer;
