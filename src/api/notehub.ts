import axios from "axios";

const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

// Додамо валідацію в консоль для розробника, щоб ви точно бачили, чи зчитався токен
if (!API_TOKEN) {
  console.error(
    "⚠️ Warning: VITE_TMDB_TOKEN is not defined in your .env file!",
  );
}

const notehubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

notehubApi.interceptors.request.use((config) => {
  if (API_TOKEN) {
    // Рядок має передаватися строго у форматі "Bearer токен"
    config.headers.Authorization = `Bearer ${API_TOKEN.trim()}`;
  }
  return config;
});

export default notehubApi;
