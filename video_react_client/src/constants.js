// export const API_URL = import.meta.env.VITE_API_POSTS_URL || 'http://localhost:3000/api/v1/posts';
export const API_URL =
  process.env.NODE_ENV === "test"
    ? "http://mock-api.com"
    : import.meta.env.VITE_API_POSTS_URL; // || 'http://localhost:3000/api/v1/posts';

export const SEARCH_API_URL =
  process.env.NODE_ENV === "test"
    ? "http://mocked-api-url"
    : import.meta.env.VITE_SEARCH_API_URL;

// export const API_KEY = import.meta.env.VITE_API_KEY;

// export const API_HOST = import.meta.env.VITE_API_HOST;

// export const API_SECRET = import.meta.env.VITE_API_SECRET;

// export const API_USERNAME = import.meta.env.VITE_API_USERNAME;
// export const API_PASSWORD = import.meta.env.VITE_API_PASSWORD;

// export const API_AUTH_TOKEN = import.meta.env.VITE_API_AUTH_TOKEN;

// // export const API_URL = 'http://localhost:3000/api/v1/posts';

// // export const API_URL = import.meta.env.VITE_API_POSTS_URL || 'http://localhost:3000/api/v1/posts';

// // export const API_URL = process.env.NODE_ENV === 'test' ? 'http://mock-api.com' : import.meta.env.VITE_API_POSTS_URL || 'http://localhost:3000/api/v1/posts';

// export const API_TIMEOUT = 5000;

// export const API_SEARCH_TIMEOUT = 5000;

// export const API_HEADERS = {
//   "Content-Type": "application/json",
//   "X-Api-Key": API_KEY,
//   "X-Api-Host": API_HOST,
//   "X-Api-Secret": API_SECRET,
//   "X-Api-Username": API_USERNAME,
//   "X-Api-Password": API_PASSWORD,
//   "X-Api-Auth-Token": API_AUTH_TOKEN,
// };

// export const API_METHODS = {
//   GET: "GET",
//   POST: "POST",
//   PUT: "PUT",
//   DELETE: "DELETE",
// };
