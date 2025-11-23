import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_STORAGE_KEY = "@sportify_auth_token";
const USER_STORAGE_KEY = "@sportify_user";
const REGISTERED_USERS_KEY = "@sportify_registered_users";

export const storageUtils = {
  // Registered Users (Mock Persistence)
  saveRegisteredUser: async (user: any): Promise<void> => {
    try {
      const existingUsersJson = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
      const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];
      
      // Check if user already exists
      const userIndex = existingUsers.findIndex((u: any) => u.username === user.username);
      if (userIndex >= 0) {
        existingUsers[userIndex] = user; // Update existing
      } else {
        existingUsers.push(user); // Add new
      }
      
      await AsyncStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(existingUsers));
    } catch (error) {
      console.error("Failed to save registered user:", error);
      throw error;
    }
  },

  getRegisteredUser: async (username: string): Promise<any | null> => {
    try {
      const existingUsersJson = await AsyncStorage.getItem(REGISTERED_USERS_KEY);
      if (!existingUsersJson) return null;
      
      const existingUsers = JSON.parse(existingUsersJson);
      return existingUsers.find((u: any) => u.username === username) || null;
    } catch (error) {
      console.error("Failed to get registered user:", error);
      return null;
    }
  },

  // Auth token
  saveAuthToken: async (token: string): Promise<void> => {
    try {
      if (!token) {
        throw new Error(
          "Cannot save invalid token: token is empty or undefined"
        );
      }
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
    } catch (error) {
      console.error("Failed to save auth token:", error);
      throw error;
    }
  },

  getAuthToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to get auth token:", error);
      return null;
    }
  },

  removeAuthToken: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove auth token:", error);
      throw error;
    }
  },

  // User data
  saveUser: async (user: any): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save user:", error);
      throw error;
    }
  },

  getUser: async (): Promise<any | null> => {
    try {
      const user = await AsyncStorage.getItem(USER_STORAGE_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to get user:", error);
      return null;
    }
  },

  removeUser: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove user:", error);
      throw error;
    }
  },

  // Clear all auth data
  clearAuthData: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([AUTH_STORAGE_KEY, USER_STORAGE_KEY]);
    } catch (error) {
      console.error("Failed to clear auth data:", error);
      throw error;
    }
  },
};
