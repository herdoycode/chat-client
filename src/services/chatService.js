import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/chats";

export const getChats = async (userId) =>
  await http.get(apiEndpoint + "/" + userId);

export const createChat = async (data) => await http.post(apiEndpoint, data);
