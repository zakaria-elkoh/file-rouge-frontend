import axios, { AxiosRequestConfig } from "axios";

export const SERVER_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export const BASE_API_URL = `${SERVER_URL}/api`;

export const userImageUrl = (userId: string | undefined) =>
  BASE_API_URL + `/users/${userId}/photo`;
export const postImageUrl = (postId: string | undefined) =>
  BASE_API_URL + `/posts/${postId}/photo`;

const getConfig = (token: string | null) => ({
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const get = async (url: string, config?: AxiosRequestConfig) => {
  const token = getToken();
  return axios.get(BASE_API_URL + url, { ...getConfig(token), ...config });
};

export const post = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  const token = getToken();
  return axios.post(BASE_API_URL + url, data ?? {}, {
    ...getConfig(token),
    ...config,
  });
};

export const put = async (url: string, data: any) => {
  const token = getToken();
  return axios.put(BASE_API_URL + url, data, getConfig(token));
};

export const patch = async (url: string, data?: any) => {
  const token = getToken();
  return axios.patch(BASE_API_URL + url, data ?? {}, getConfig(token));
};

export const APIdelete = async (url: string) => {
  const token = getToken();
  return axios.delete(BASE_API_URL + url, getConfig(token));
};

export function getToken() {
  return localStorage.getItem("glbook-token");
}
