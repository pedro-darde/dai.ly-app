import axios from "axios";

const axiosPlugin = axios.create({
  baseURL: "http://localhost:8000",
});

export default axiosPlugin;
