import config from "../config.json";
import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(data) {
  const { data: jwt } = await http.post(apiEndpoint, data);
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export const getCurrentUser = () => {
  try {
    return jwtDecode(localStorage.getItem("token"));
  } catch (error) {
    return null;
  }
};
