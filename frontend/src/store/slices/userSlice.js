import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Load initial state from localStorage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  loading: false,
  isAuthenticated: !!token,
  user: user || null,
  token: token || null,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.message = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.message = action.payload.message;

      // ✅ Save to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    registerFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // ✅ Save to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    fetchUserRequest(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fetchUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      // ✅ Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    logoutFailed(state, action) {
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest());
  try {
    const response = await axios.post(
      "https://jobportalback.onrender.com/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(userSlice.actions.registerSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response?.data?.message || "Registration failed"));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());
  try {
    const response = await axios.post(
      "https://jobportalback.onrender.com/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Login response:", response.data);
    dispatch(userSlice.actions.loginSuccess(response.data));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.error("Login failed:", error.response?.data?.message || error.message);
    dispatch(userSlice.actions.loginFailed(error.response?.data?.message || "Login failed"));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest());

  try {
    const token = localStorage.getItem("token"); // ✅ Load token from localStorage

    if (!token) {
      throw new Error("No token found, user might be logged out");
    }

    const response = await axios.get(
      "https://jobportalback.onrender.com/api/v1/user/getuser",
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Attach token
        },
        withCredentials: true,
      }
    );

    console.log("User data received:", response.data);
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    console.error("Fetch user failed:", error.response?.data?.message || error.message);
    dispatch(userSlice.actions.fetchUserFailed(error.response?.data?.message || "Failed to fetch user"));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("https://jobportalback.onrender.com/api/v1/user/logout", {
      withCredentials: true,
    });

    dispatch(userSlice.actions.logoutSuccess());
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response?.data?.message || "Logout failed"));
  }
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer;
