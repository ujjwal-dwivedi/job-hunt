// constant.js

// Base URL for API - MUST be set in environment variables
const API_BASE_URL = import.meta.env.VITE_USER_API_END_POINT;

// Throw error if API_BASE_URL is not set
if (!API_BASE_URL) {
  throw new Error("VITE_API_URL environment variable is not set! Please configure it in your deployment settings.");
}


export const USER_API_END_POINT        = `${API_BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT         = `${API_BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT     = `${API_BASE_URL}/api/v1/company`;

// Default avatar for users without profile photo
export const DEFAULT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
