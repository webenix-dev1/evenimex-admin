import { localStorageKeys, secureKeys } from "./constant";

const jwt = require("jsonwebtoken");

export const encodeData = (data, key, name, storeToLocal = true) => {
  if (storeToLocal) {
    localStorage.setItem(name, jwt.sign(data, key));
  } else {
    return jwt.sign(data, key);
  }
};

export const decodeData = (token, key) => {
  if (token) {
    return jwt.verify(token, key);
  }
  return null;
};

export const getUserData = () => {
  if (typeof window !== "undefined") {
    const userDataToken = localStorage.getItem(localStorageKeys.userToken);
    if (userDataToken) {
      const userData = decodeData(userDataToken, secureKeys.userToken);
      return userData;
    }
  }
  return null;
};

export const getUserToken = () => {
  const user = getUserData();
  if (user && user.token) {
    return user.token;
  }
  return "";
};

export const getDecodedData = (localKey, secureKey) => {
  if (typeof window !== "undefined") {
    const encodedData = localStorage.getItem(localKey);
    if (encodedData) {
      const data = decodeData(encodedData, secureKey);
      return data;
    }
  }
  return null;
};

export const checkLogin = () => {
  const user = getUserData();
  const userDetails = {};
  if (user) {
    userDetails.isLogin = true;
    if (user?.role == "admin") {
      userDetails.isAdmin = true;
      userDetails.isUser = false;
    } else {
      userDetails.isAdmin = false;
      userDetails.isUser = true;
    }
  } else {
    userDetails.isLogin = false;
    userDetails.redirect = "/register";
  }
  return userDetails;
};

export const removeTokenFromLocal = () => {
  localStorage.removeItem(localStorageKeys.userToken);
};
