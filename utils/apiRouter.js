const prefixRouteV1 = (route) => {
  return `api/${route}`;
};

const apiRouter = {
  SIGNUP: prefixRouteV1("user/auth/register-user"),
  LOGIN: prefixRouteV1("adminSignIn"),
  // Home Slider
  HERO_SLIDER_LIST: prefixRouteV1("heroSliderList"),
  ADD_UPDATE_HERO_SLIDER_LIST: prefixRouteV1("addHeroSlider"),
  REMOVE_HERO_SLIDER_LIST: prefixRouteV1("removeHeroSlider"),
  // Venue List Route
  VENUE_CITY_LIST: prefixRouteV1("getVenueLocationCityList"),
  ADD_VENUE_CITY: prefixRouteV1("addVenueLocationCity"),
  REMOVE_VENUE_CITY: prefixRouteV1("removeVenueLocationCity"),

  //third party api to get city from lat lng
  GETCITYAPI: "https://nominatim.openstreetmap.org/reverse",
};

export default apiRouter;
