export const AUTH_STORAGE_KEY = "smarttrak-auth-user";
export const AUTH_SESSION_KEY = "smarttrak-auth-session";

export const DEFAULT_CREDENTIALS = {
  email: "demo@smarttrak.app",
  password: "password123",
};

export type StoredUser = {
  email: string;
  password: string;
};
