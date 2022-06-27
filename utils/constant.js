import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

import {
  Italy_icon_svg,
  United_Kingdom_icon_svg,
} from "../assets/svgs/svgOfPage";

export const seoDetail = {
  title: "",
  canonical: "",
  desc: "",
  image: "",
  keywords: "",
  siteName: "",
  siteIcon: "",
};

export const searchRadiusOptions = [
  { value: 10, label: "10 miles" },
  { value: 25, label: "25 miles" },
  { value: 50, label: "50 miles" },
  { value: 100, label: "100 miles" },
  { value: 0, label: "Anywhere" },
];

export const secureKeys = {
  userData: "userData",
  registerData: "registerFlowData",
  userToken: "userToken",
  userLanguage: "userToken",
};

export const localStorageKeys = {
  userData: "user",
  registerData: "register",
  userToken: "token",
  userLanguage: "uLang",
  user: "user",
  token: "token",
};
export const captchaKeys = {
  siteKey: publicRuntimeConfig.captchaSiteKey,
  secreteKey: publicRuntimeConfig.captchaSecretKey,
};

export const languageSelect = [
  {
    language: "English",
    value: "en",
    icon: United_Kingdom_icon_svg,
    class: "United_Kingdom_icon",
  },
  {
    language: "Italiano",
    value: "it",
    icon: Italy_icon_svg,
    class: "Italy_icon",
  },
];

export const imageBashUrl = "https://meemint.s3.eu-south-1.amazonaws.com/";
export const staticImagesUrl = {
  postBgImg: "/images/postbg.png",
};

export const S3Bucket = {
  venueImages: "venueImages",
  HOME_SLIDER: "homeSlider",
};
