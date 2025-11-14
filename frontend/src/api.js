import axios from "axios";

export const api = axios.create({
  baseURL: "https://gcal-backend.onrender.com/api",  
});
