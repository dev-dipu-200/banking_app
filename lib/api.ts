// lib/api.ts
/**
 * Centralized API utility for making HTTP requests
 * Provides a consistent interface for API calls with error handling
 */

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
  status: number;
  message?: string;
}

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  body?: any;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  credentials?: RequestCredentials;
}

/**
 * Base API URL - configure based on environment
 */
const getBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }
  // Client-side
  return process.env.NEXT_PUBLIC_API_URL || '/api';
};

/**
 * Build URL with query parameters
 */
const buildUrl = (endpoint: string, params?: Record<string, string | number | boolean>): string => {
  const baseUrl = getBaseUrl();
  const url = new URL(`${baseUrl}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  return url.toString();
};

/**
 * Create abort controller with timeout
 */
const createAbortController = (timeout?: number): AbortController => {
  const controller = new AbortController();

  if (timeout) {
    setTimeout(() => controller.abort(), timeout);
  }

  return controller;
};

/**
 * Main API request function
 */
export async function apiRequest<T = any>(
  endpoint: string,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    params,
    timeout = 30000, // 30 seconds default
    credentials = 'include',
  } = config;

  try {
    const url = buildUrl(endpoint, params);
    const controller = createAbortController(timeout);

    // Prepare headers
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Prepare request options
    const options: RequestInit = {
      method,
      headers: defaultHeaders,
      credentials,
      signal: controller.signal,
    };

    // Add body for non-GET requests
    if (body && method !== 'GET') {
      options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    // Make the request
    const response = await fetch(url, options);

    // Parse response
    let data: T | undefined;
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = (await response.text()) as any;
    }

    // Handle success
    if (response.ok) {
      return {
        data,
        success: true,
        status: response.status,
        message: 'Request successful',
      };
    }

    // Handle HTTP errors
    return {
      error: typeof data === 'string' ? data : 'Request failed',
      success: false,
      status: response.status,
      message: typeof data === 'object' && data && 'message' in data
        ? (data as any).message
        : `HTTP ${response.status}: ${response.statusText}`,
    };

  } catch (error: any) {
    // Handle network errors, timeouts, etc.
    if (error.name === 'AbortError') {
      return {
        error: 'Request timeout',
        success: false,
        status: 408,
        message: 'The request took too long to complete',
      };
    }

    return {
      error: error.message || 'Network error',
      success: false,
      status: 0,
      message: error.message || 'Failed to connect to the server',
    };
  }
}

/**
 * Convenience methods for common HTTP verbs
 */

export const api = {
  /**
   * GET request
   */
  get: async <T = any>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
    config?: Omit<ApiRequestConfig, 'method' | 'body' | 'params'>
  ): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      ...config,
      method: 'GET',
      params,
    });
  },

  /**
   * POST request
   */
  post: async <T = any>(
    endpoint: string,
    body?: any,
    config?: Omit<ApiRequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      ...config,
      method: 'POST',
      body,
    });
  },

  /**
   * PUT request
   */
  put: async <T = any>(
    endpoint: string,
    body?: any,
    config?: Omit<ApiRequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      ...config,
      method: 'PUT',
      body,
    });
  },

  /**
   * PATCH request
   */
  patch: async <T = any>(
    endpoint: string,
    body?: any,
    config?: Omit<ApiRequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body,
    });
  },

  /**
   * DELETE request
   */
  delete: async <T = any>(
    endpoint: string,
    config?: Omit<ApiRequestConfig, 'method' | 'body'>
  ): Promise<ApiResponse<T>> => {
    return apiRequest<T>(endpoint, {
      ...config,
      method: 'DELETE',
    });
  },
};

/**
 * Upload file(s) with multipart/form-data
 */
export async function uploadFile<T = any>(
  endpoint: string,
  files: File | File[],
  additionalData?: Record<string, any>,
  config?: Omit<ApiRequestConfig, 'method' | 'body' | 'headers'>
): Promise<ApiResponse<T>> {
  try {
    const formData = new FormData();

    // Add files
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`file_${index}`, file);
      });
    } else {
      formData.append('file', files);
    }

    // Add additional data
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
      });
    }

    const url = buildUrl(endpoint);
    const controller = createAbortController(config?.timeout || 60000); // 60s for uploads

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      credentials: config?.credentials || 'include',
      signal: controller.signal,
    });

    let data: T | undefined;
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = (await response.text()) as any;
    }

    if (response.ok) {
      return {
        data,
        success: true,
        status: response.status,
        message: 'Upload successful',
      };
    }

    return {
      error: typeof data === 'string' ? data : 'Upload failed',
      success: false,
      status: response.status,
      message: typeof data === 'object' && data && 'message' in data
        ? (data as any).message
        : 'File upload failed',
    };

  } catch (error: any) {
    return {
      error: error.message || 'Upload error',
      success: false,
      status: 0,
      message: error.message || 'Failed to upload file',
    };
  }
}

/**
 * Download file
 */
export async function downloadFile(
  endpoint: string,
  filename?: string,
  config?: Omit<ApiRequestConfig, 'method' | 'body'>
): Promise<ApiResponse<Blob>> {
  try {
    const url = buildUrl(endpoint, config?.params);
    const controller = createAbortController(config?.timeout || 60000);

    const response = await fetch(url, {
      method: 'GET',
      headers: config?.headers,
      credentials: config?.credentials || 'include',
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        error: 'Download failed',
        success: false,
        status: response.status,
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const blob = await response.blob();

    // Trigger download
    if (typeof window !== 'undefined') {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }

    return {
      data: blob,
      success: true,
      status: response.status,
      message: 'Download successful',
    };

  } catch (error: any) {
    return {
      error: error.message || 'Download error',
      success: false,
      status: 0,
      message: error.message || 'Failed to download file',
    };
  }
}

export default api;
