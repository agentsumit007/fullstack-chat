import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/api";
import { disconnectSocket, initSocket } from "../utils/socket";
const initialState = {
  _id: "",
  fullName: "",
  email: "",
  profilePicture: "",
  accessToken: "",
  isLoading: false,
  isLoggedIn: false,
  success: false,
  error: false,
  message: "",
  additionalData: {},
};
const getAuthStateFromLocalStorage = () => {
  try {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    initSocket(user._id);
    if (token && user) {
      initSocket(user._id);
      return {
        ...user,
        accessToken: token,
        isLoading: false,
        isLoggedIn: true,
      };
    }
  } catch (e) {
    console.warn("Error reading auth state from localStorage:", e);
  }

  return initialState;
};

export const login = createAsyncThunk(
  "login",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("auth/login", formData, {});
      if (response?.data?.status) {
        initSocket(response?.data?.data?._id);
        return {
          ...response?.data?.data,
          message: response?.data?.message,
          accessToken: response?.data?.token,
        };
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error?.message);
    }
  }
);
export const registerForm = createAsyncThunk(
  "register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/signup", formData, {});
      if (response?.data?.status) {
        initSocket(response?.data?.data?._id);
        return {
          ...response?.data?.data,
          message: response?.data?.message,
          accessToken: response?.data?.token,
        };
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: getAuthStateFromLocalStorage(),
  reducers: {
    logout: (state, action) => {
      disconnectSocket();
      state = initialState;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    },
    clearStatus: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = false;
      state.message = false;
    },
    setProfileData: (state, action) => {
      state.fullName = action.payload.fullName;
      state.profilePicture = action.payload.profilePicture;
      state.additionalData = action.payload.additionalData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload));

        state._id = action.payload._id;
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.profilePicture = action.payload.profilePicture;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
        state.success = true;
        state.message = action?.payload?.message;
        state.isLoggedIn = true;
        state.additionalData = action.payload.additionalData;
      })
      .addCase(login.rejected, (state, action) => {
        state._id = "";
        state.fullName = "";
        state.email = "";
        state.profilePicture = "";
        state.accessToken = "";
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = true;
        state.message = action?.payload?.message;
      })
      .addCase(registerForm.pending, (state, action) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(registerForm.fulfilled, (state, action) => {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload));

        state._id = action.payload._id;
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.profilePicture = action.payload.profilePicture;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.success = true;
        state.message = action?.payload?.message || action?.payload;
        state.additionalData = action.payload.additionalData;
      })
      .addCase(registerForm.rejected, (state, action) => {
        state._id = "";
        state.fullName = "";
        state.email = "";
        state.profilePicture = "";
        state.accessToken = "";
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = true;
        state.message = action?.payload?.message || action?.payload;
      });
  },
});

export const { logout, clearStatus, setProfileData } = authSlice.actions;

export default authSlice.reducer;
