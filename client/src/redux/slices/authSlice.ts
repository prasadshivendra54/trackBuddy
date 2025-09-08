import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Interfac for name and email
interface User {
  id?: string;
  name?: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface SignInPayload {
  email: string;
  password: string;
}

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

interface SigninResponse {
  message: string;
  jwt: string; // jwt token
  user?: User;
}

// signup
interface SignupResponse {
  id: string;
  name: string;
  email: string;
  jwt: string;
}

// Get user and token from localStorage (if already signin)
const userFromStorage: User | null = (() => {
  try {
    const stored = localStorage.getItem("userInfo");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
})();

const tokenFromStorage: string | null = localStorage.getItem("userToken");

// state (before login)
const initialState: AuthState = {
  user: userFromStorage,
  token: tokenFromStorage,
  loading: false,
  error: null,
};

// Async Actions (API call will here)

// Signin
export const signin = createAsyncThunk<
  { user: User; token: string },
  SignInPayload,
  { rejectValue: { message: string } }
>("auth/signin", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<SigninResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/signin`, // api call for signin
      userData
    );

    const token = response.data.jwt;

    // let user;
    // if (response.data.user) {
    //     // if server gave us a user so we will use that else email
    //     user = response.data.user;
    // } else {
    //     user = { email: userData.email };
    // }
    const user = response.data.user ?? { email: userData.email }; // we can take user or email

    if (!token) {
      console.log("No token received from backend");
    }

    // Save to localStorage
    localStorage.setItem("userInfo", JSON.stringify(user));
    localStorage.setItem("userToken", token);

    return { user, token };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data || { message: "Signin failed" }
    );
  }
});

// Signup api call
export const signup = createAsyncThunk<
  { user: User; token: string },
  SignUpPayload,
  { rejectValue: { message: string } }
>("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<SignupResponse>(
      `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
      userData
    );

    const token = response.data.jwt;
    const user: User = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
    };

    if (!token) throw new Error("No token received from backend");

    // Save to localStorage, so when we reload our page our habit data will not remove
    localStorage.setItem("userInfo", JSON.stringify(user));
    localStorage.setItem("userToken", token);

    return { user, token };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data || { message: "Signup failed" }
    );
  }
});

// Slice creating (State and Reducers)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logout clears localStorage data like user jwt token
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // signin case
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signin.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "Signin failed";
      })
      // signup case
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "Signup failed";
      });
  },
});

// Export our reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
