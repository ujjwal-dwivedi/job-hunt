// constant.js

const API_BASE_URL = import.meta.env.VITE_USER_API_END_POINT || "http://localhost:8000";

export { API_BASE_URL };

// API endpoints (for direct axios usage if needed)
export const USER_API_END_POINT        = `${API_BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT         = `${API_BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT     = `${API_BASE_URL}/api/v1/company`;

// Default avatar for users without profile photo
export const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
