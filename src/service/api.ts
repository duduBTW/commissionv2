import { env } from "env/client.mjs";
import axios from "axios";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export default api;
