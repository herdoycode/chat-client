import config from "../config.json";
import http from "./httpService";

export const getMessage = async (chatId) =>
  await http.get(config.apiUrl + "/messages/" + chatId);

export const sentMessage = (message) =>
  http.post(config.apiUrl + "/messages", message);
