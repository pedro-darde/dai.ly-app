import axios from "axios";

const axiosPlugin = axios.create({
  baseURL: "http://localhost:3001",
});

export default axiosPlugin;
