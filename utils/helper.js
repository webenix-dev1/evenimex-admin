import apiRouter from "./apiRouter";
import { axiosGet } from "./axiosHelper";
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
    const userDataToken = localStorage.getItem(localStorageKeys.userData);
    if (userDataToken) {
      const userData = decodeData(userDataToken, secureKeys.userData);
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
  console.log("GT USER", user);
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
    userDetails.redirect = "/login";
  }
  return userDetails;
};

export const removeTokenFromLocal = () => {
  localStorage.removeItem(localStorageKeys.userToken);
  localStorage.removeItem(localStorageKeys.userData);
};

export const getVenueBeverageList = async () => {
  try {
    const respose = await axiosGet(apiRouter.VENUE_BEVERAGE_LIST);
    return respose?.data?.data;
  } catch (error) {
    console.log("Error ::", error);
  }
};
export const getVenueDisabledFacilitiesList = async () => {
  try {
    const respose = await axiosGet(apiRouter.VENUE_DISABLE_LIST);
    return respose?.data?.data;
  } catch (error) {
    console.log("Error ::", error);
  }
};
export const getVenueEquipmentList = async () => {
  try {
    const respose = await axiosGet(apiRouter.VENUE_EDUIPMENT_LIST);
    return respose?.data?.data;
  } catch (error) {
    console.log("Error ::", error);
  }
};
export const getVenueEventsList = async () => {
  try {
    const respose = await axiosGet(apiRouter.VENUE_EVENTS_LIST);
    return respose?.data?.data;
  } catch (error) {
    console.log("Error ::", error);
  }
};
export const getVenueFacilitiesList = async () => {
  try {
    const respose = await axiosGet(apiRouter.VENUE_FACILITIES_LIST);
    return respose?.data?.data;
  } catch (error) {
    console.log("Error ::", error);
  }
};
export const getVenueLocationList = async () => {
  try {
    const respose = await axiosGet(apiRouter.VENUE_LOCATION_LIST);
    return respose?.data?.data;
  } catch (error) {
    console.log("Error ::", error);
  }
};
export const getVenueLocationCityList = async () => {
  try {
    const respose = await axiosGet(apiRouter.VENUE_CITY_LIST);
    return respose?.data?.data;
  } catch (error) {
    console.log("Error ::", error);
  }
};
export const getVenueLocationTypeList = async () => {
  try {
    const respose = await axiosGet(apiRouter.VENUE_LOCATION_TYPE_LIST);
    return respose?.data?.data;
  } catch (error) {
    console.log("Error ::", error);
  }
};
export const getVenueMenuList = async () => {
  try {
    const respose = await axiosGet(apiRouter.VENUE_MENU_LIST);
    return respose?.data?.data;
  } catch (error) {
    console.log("Error ::", error);
  }
};
export const getVenueServiceList = async () => {
  try {
    const respose = await axiosGet(apiRouter.VENUE_SERVICE_LIST);
    return respose?.data?.data;
  } catch (error) {
    console.log("Error ::", error);
  }
};
