import axios from "axios";

const axiosPlugin = axios.create({
  baseURL: "http://localhost:3335",
});

export default axiosPlugin;
