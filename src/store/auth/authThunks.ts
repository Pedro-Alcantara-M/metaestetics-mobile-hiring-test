import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginCredentials, RegisterData, UpdateProfileArgs } from "@types";
import { mockApiService, storageService } from "@services";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await mockApiService.login(credentials);
      await storageService.saveToken(response.token);
      await storageService.saveUser(response.user);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await mockApiService.register(data);
      await storageService.saveToken(response.token);
      await storageService.saveUser(response.user);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await mockApiService.logout();
  await storageService.clearAll();
});

export const checkAuthThunk = createAsyncThunk("auth/checkAuth", async () => {
  const token = await storageService.getToken();
  if (token) {
    const user = await storageService.getUser();
    return user;
  }
  return null;
});

export const updateThunkProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ userId, updates }: UpdateProfileArgs, { rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error("User not found");
      }

      const response = await mockApiService.updateProfile(userId, updates);
      await storageService.saveUser(response.user);

      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update profile");
    }
  }
);
