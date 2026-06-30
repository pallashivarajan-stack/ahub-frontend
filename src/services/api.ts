import axios, { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

// The base URL should be configurable, defaulting to the local FastAPI server
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ssrStorage = {
  getItem(key: string): string | null {
    if (typeof window === "undefined") return null;
    try { return localStorage.getItem(key); } catch { return null; }
  },
  setItem(key: string, value: string) {
    if (typeof window === "undefined") return;
    try { localStorage.setItem(key, value); } catch { /* quota */ }
  },
  removeItem(key: string) {
    if (typeof window === "undefined") return;
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  },
};

const getAccessToken = () => ssrStorage.getItem("access_token");

export const setTokens = (accessToken: string, refreshToken: string) => {
  ssrStorage.setItem("access_token", accessToken);
  ssrStorage.setItem("refresh_token", refreshToken);
};

export const clearTokens = () => {
  ssrStorage.removeItem("access_token");
  ssrStorage.removeItem("refresh_token");
};

// Request Interceptor: Attach access token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Handle token refresh on 401
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = 'Bearer ' + token;
            }
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = ssrStorage.getItem("refresh_token");

      if (!refreshToken) {
        clearTokens();
        if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
          window.location.href = "/admin/login";
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, {
          refresh_token: refreshToken
        });
        
        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        setTokens(newAccessToken, newRefreshToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
          window.location.href = '/admin/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
