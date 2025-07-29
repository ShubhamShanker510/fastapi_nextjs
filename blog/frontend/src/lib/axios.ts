import axios from "axios";

const api=axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
    withCredentials: true
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Session expired. Redirecting to login.");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);


export default api;