const prefixRouteV1 = (route) => {
  return `api/${route}`;
};

const apiRouter = {
  SIGNUP: prefixRouteV1("user/auth/register-user"),
  LOGIN: prefixRouteV1("user/auth/login"),
  // Home Slider
  HERO_SLIDER_LIST: prefixRouteV1("heroSliderList"),
  ADD_UPDATE_HERO_SLIDER_LIST: prefixRouteV1("addHeroSlider"),
  REMOVE_HERO_SLIDER_LIST: prefixRouteV1("removeHeroSlider"),

  //third party api to get city from lat lng
  GETCITYAPI: "https://nominatim.openstreetmap.org/reverse",
};

export default apiRouter;
