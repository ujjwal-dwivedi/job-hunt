import axios from 'axios';

// Get the backend base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_USER_API_END_POINT;

// Validate that the environment variable is set
if (!API_BASE_URL) {
  console.error('VITE_USER_API_END_POINT is not set!');
  throw new Error('Backend API URL is not configured. Please set VITE_USER_API_END_POINT in your environment variables.');
}


const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config) => {
    // Log request for debugging (remove in production)
    console.log(` ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error(' Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    // Log successful response (remove in production)
    console.log(`${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      console.error(` ${error.response.status} - ${error.response.config.url}`, error.response.data);
      
      // Handle specific status codes
      if (error.response.status === 401) {
        console.warn(' Unauthorized - User may need to login');
      } else if (error.response.status === 403) {
        console.warn(' Forbidden - Access denied');
      } else if (error.response.status === 500) {
        console.error(' Server error');
      }
    } else if (error.request) {
      console.error(' No response from server:', error.request);
    } else {
      console.error(' Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

// Helper function for multipart/form-data requests (file uploads)
export const createFormDataRequest = (config = {}) => {
  return axios.create({
    baseURL: `${API_BASE_URL}/api/v1`,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  });
};
