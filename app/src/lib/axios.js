import axios from "axios";

const axiosPlugin = axios.create({
  baseURL: "http://localhost:3000",
});

export default axiosPlugin;
