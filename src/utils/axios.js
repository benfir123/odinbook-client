import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://odinbook-ben.herokuapp.com/api",
});

export default instance;
