// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Django backend
  headers: {
    "Content-Type": "application/json",
  },
});

// For attaching token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
    // ❌ Don't send Authorization header for login or register
  if (token && !config.url.includes("/login/") && !config.url.includes("/register/")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
