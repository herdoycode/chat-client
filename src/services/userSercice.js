import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/users";

export const registerUser = async (data) => await http.post(apiEndpoint, data);

export const getUser = async (userId) =>
  await http.get(apiEndpoint + "/" + userId);

export const gerUsers = async () => await http.get(apiEndpoint);
