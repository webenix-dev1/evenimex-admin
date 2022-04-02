const prefixRouteV1 = (route) => {
  return `v1/${route}`;
};

const apiRouter = {
  SIGNUP: prefixRouteV1("user/auth/register-user"),
  LOGIN: prefixRouteV1("user/auth/login"),

  //third party api to get city from lat lng
  GETCITYAPI: "https://nominatim.openstreetmap.org/reverse",
};

export default apiRouter;
