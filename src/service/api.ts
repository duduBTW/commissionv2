import { env } from "env/client.mjs";
import axios from "axios";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  // baseURL: "http://192.168.0.114:3000/",
});

export default api;
