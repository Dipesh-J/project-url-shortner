import axios from 'axios';

/**
 * API Configuration
 * Uses proxy in development, configurable base URL for production
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for logging/auth
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

/**
 * URL Shortener API Services
 */
export const urlService = {
  /**
   * Create a shortened URL from a long URL
   * @param {string} longUrl - The original URL to shorten
   * @returns {Promise<{data: {shortUrlCode: string, longUrl: string, shortUrl: string}}>}
   */
  createShortUrl: async (longUrl) => {
    const response = await api.post('/createShortUrl', { longUrl });
    return response.data;
  },

  /**
   * Get the original URL from a short URL code
   * Note: This endpoint redirects, so we need to handle it differently
   * @param {string} shortUrlCode - The short URL code
   * @returns {Promise<string>} - The redirect URL
   */
  getOriginalUrl: async (shortUrlCode) => {
    // This endpoint redirects, so we catch the redirect
    const response = await api.get(`/${shortUrlCode}`, {
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 400,
    });
    return response.headers.location || response.request.responseURL;
  },
};

export default api;
