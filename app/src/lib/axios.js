import axios from "axios";

const axiosPlugin = axios.create({
  baseURL: "http://localhost:8001",
});

export default axiosPlugin;
