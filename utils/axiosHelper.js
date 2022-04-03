import axios from "axios";
import getConfig from "next/config";
import { localStorageKeys, secureKeys } from "./constant";
import { getDecodedData, getUserToken } from "./helper";

const { publicRuntimeConfig } = getConfig();

export const axiosApi = axios.create({
  baseURL: publicRuntimeConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer token`,
  },
});

export const axiosPost = async (
  url,
  data,
  token = null,
  contentType = "application/json"
) => {
  let response = {};
  try {
    const localToken = getUserToken() || token || "";
    const result = await axiosApi.post(url, data, {
      headers: {
        Authorization: `Bearer ${localToken}`,
        "Content-Type": contentType,
      },
    });
    response.status = true;
    response.data = result.data;
  } catch (e) {
    if (e.response) {
      if (e.response.status == 400) {
        response.status = false;
        response.message = e.response.data.message;
      } else if (e.response.status == 500) {
        response.status = false;
        response.message = "Internal server error";
      } else {
        response.status = false;
        response.message = "something went wrong";
      }
    }
  }
  return response;
};

export const axiosGet = async (url, token = null) => {
  let response = {};
  const localToken = getUserToken() || token || "";
  console.log("TOKEN ::", localToken);
  try {
    const result = await axiosApi.get(url, {
      headers: {
        Authorization: `Bearer ${localToken}`,
      },
    });
    response.status = true;
    response.data = result.data;
  } catch (e) {
    if (e.response.status == 400) {
      response.status = false;
      response.message = e.response.data.message;
    } else if (e.response.status == 500) {
      response.status = false;
      response.message = "Internal server error";
    } else {
      response.status = false;
      response.message = "something went wrong";
    }
  }
  return response;
};

export const axiosDelete = async (url, token = null) => {
  let response = {};
  try {
    const result = await axiosApi.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    response.status = true;
    response.data = result.data;
  } catch (e) {
    if (e.response.status == 400) {
      response.status = false;
      response.message = e.response.data.message;
    } else if (e.response.status == 500) {
      response.status = false;
      response.message = "Internal server error";
    } else {
      response.status = false;
      response.message = "something went wrong";
    }
  }
  return response;
};
