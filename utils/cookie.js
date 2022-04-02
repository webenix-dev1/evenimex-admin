import Cookies from "js-cookie";
import { getSession } from "next-auth/client";
import router from "./router";

export const getCookie = async (name) => {
  return await Cookies.get(name);
};

export const setCookie = (name, value) => {
  Cookies.set(name, value, { path: "" });
  return true;
};

export const checkSession = async (req) => {
  const session = await getSession({ req });
  return session;
};

export const protectedRoute = async (req) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      status: true,
      redirectRoute: {
        redirect: {
          destination: router.LOGIN,
          permanent: false,
        },
      },
    };
  }
  return { status: false };
};

export const redirectRoute = async (req) => {
  const session = await getSession({ req });
  if (session) {
    return {
      status: true,
      redirectRoute: {
        redirect: {
          destination: "/",
          permanent: false,
        },
      },
    };
  }
  return { status: false };
};
