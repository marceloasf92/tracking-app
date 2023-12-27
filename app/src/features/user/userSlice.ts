import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
}

interface LoginPayload {
  token: string;
  informations: {
    name: string;
    id: number;
  };
}

const initialState: UserState = {
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
    login: (state, action: PayloadAction<LoginPayload>) => {
      if (typeof window !== "undefined") {
        const { token, informations } = action.payload;
        localStorage.setItem("authToken", token);
        localStorage.setItem("informations", JSON.stringify(informations));
        document.cookie = `authToken=${token}; path=/;`;
        state.username = informations.name;
      }
    },
    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        localStorage.removeItem("informations");
        document.cookie =
          "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        state.username = null;
      }
    },
  },
});

export const { setUsername, login, logout } = userSlice.actions;
export default userSlice.reducer;
