import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://api.jikan.moe/v4",
});
export { CanceledError };
