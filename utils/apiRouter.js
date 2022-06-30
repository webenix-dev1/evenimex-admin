const prefixRouteV1 = (route) => {
  return `api/${route}`;
};

const apiRouter = {
  SIGNUP: prefixRouteV1("signup"),
  LOGIN: prefixRouteV1("adminSignIn"),
  // Admin
  ADMIN_SIGNUP: prefixRouteV1("adminSignup"),
  GET_ALL_ADMIN: prefixRouteV1("getAllAdmin"),
  ADMIN_UPDATE: prefixRouteV1("adminUpdate"),
  ADMIN_REMOVE: prefixRouteV1("removeAdmin"),

  // User
  VENDERS: prefixRouteV1("getAllVender"),
  VENDERS_SELECT_LIST: prefixRouteV1("getAllVenderList"),
  ALL_USERS: prefixRouteV1("getAllUser"),
  USER_UPDATE: prefixRouteV1("adminUpdateUser"),
  USER_REMOVE_BY_ADMIN: prefixRouteV1("adminRemoveUser"),
  // Home Slider
  DASHBOARD_DETAILS: prefixRouteV1("getDashboardDetail"),
  HERO_SLIDER_LIST: prefixRouteV1("heroSliderList"),
  ADD_UPDATE_HERO_SLIDER_LIST: prefixRouteV1("addHeroSlider"),
  REMOVE_HERO_SLIDER_LIST: prefixRouteV1("removeHeroSlider"),

  // Venue Amenities
  ADD_VENUE_AMENITIES: prefixRouteV1("addAmenities"),
  VENUE_AMENITIES_LIST: prefixRouteV1("getAmenities"),
  VENUE_AMENITIES_REMOVE: prefixRouteV1("removeAmenities"),
  // Venue Beverage Route
  VENUE_BEVERAGE_LIST: prefixRouteV1("getVenueBeverageList"),
  ADD_VENUE_BEVERAGE: prefixRouteV1("addVenueBeverage"),
  REMOVE_VENUE_BEVERAGE: prefixRouteV1("removeVenueBeverage"),
  // Venue Disable Facilities Route
  VENUE_DISABLE_LIST: prefixRouteV1("getVenueDisabledFacilitiesList"),
  ADD_VENUE_DISABLE: prefixRouteV1("addVenueDisabledFacilities"),
  REMOVE_VENUE_DISABLE: prefixRouteV1("removeVenueDisabledFacilities"),
  // Venue Equipment Route
  VENUE_EDUIPMENT_LIST: prefixRouteV1("getVenueEquipmentList"),
  ADD_VENUE_EDUIPMENT: prefixRouteV1("addVenueEquipment"),
  REMOVE_VENUE_EDUIPMENT: prefixRouteV1("removeVenueEquipment"),
  // Venue Events Route
  VENUE_EVENTS_LIST: prefixRouteV1("getVenueEventsList"),
  ADD_VENUE_EVENTS: prefixRouteV1("addVenueEvents"),
  REMOVE_VENUE_EVENTS: prefixRouteV1("removeVenueEvents"),
  // Venue Facilities Route
  VENUE_FACILITIES_LIST: prefixRouteV1("getVenueFacilitiesList"),
  ADD_VENUE_FACILITIES: prefixRouteV1("addVenueFacilities"),
  REMOVE_VENUE_FACILITIES: prefixRouteV1("removeVenueFacilities"),
  // Venue Location
  VENUE_LOCATION_LIST: prefixRouteV1("getVenueLocationList"),
  ADD_VENUE_LOCATION: prefixRouteV1("addVenueLocation"),
  REMOVE_VENUE_LOCATION: prefixRouteV1("removeVenueLocation"),
  // Venue List Route
  VENUE_CITY_LIST: prefixRouteV1("getVenueLocationCityList"),
  VENUE_CITY_LIST_BY_PAGE: prefixRouteV1("getVenueLocationCityListByPage"),
  ADD_VENUE_CITY: prefixRouteV1("addVenueLocationCity"),
  REMOVE_VENUE_CITY: prefixRouteV1("removeVenueLocationCity"),
  // Venue Location Type
  VENUE_LOCATION_TYPE_LIST: prefixRouteV1("getVenueLocationTypeList"),
  ADD_VENUE_LOCATION_TYPE: prefixRouteV1("addVenueLocationType"),
  REMOVE_VENUE_LOCATION_TYPE: prefixRouteV1("removeVenueLocationType"),
  // Venue Menu Route
  VENUE_MENU_LIST: prefixRouteV1("getVenueMenuList"),
  ADD_VENUE_MENU: prefixRouteV1("addVenueMenu"),
  REMOVE_VENUE_MENU: prefixRouteV1("removeVenueMenu"),
  // Venue Service Route
  VENUE_SERVICE_LIST: prefixRouteV1("getVenueServiceList"),
  ADD_VENUE_SERVICE: prefixRouteV1("addVenueService"),
  REMOVE_VENUE_SERVICE: prefixRouteV1("removeVenueService"),

  // Amenities
  VENUE_AMENITIES: prefixRouteV1("getAmenities"),

  // Venue DEtails
  VENUE_CREATE: prefixRouteV1("addVenueMain"),
  VENUE_UPDATE: prefixRouteV1("updateVenueMain"),
  VENUE_REMOVE: prefixRouteV1("removeVenueMain"),
  VENUE_LIST: prefixRouteV1("venueList"),
  // VENUE_LIST: prefixRouteV1("venueList"),
  // VENUE_UPDATE: prefixRouteV1("updateVenue"),
  // VENUE_CREATE: prefixRouteV1("addVenue"),
  // VENUE_REMOVE: prefixRouteV1("removeVenue"),

  // Venue Place
  VENUE_PLACE_CREATE: prefixRouteV1("addVenueSpace"),
  VENUE_PLACE_UPDATE: prefixRouteV1("updateVenueSpace"),
  VENUE_PLACE_REMOVE: prefixRouteV1("removeVenueSpace"),
  VENUE_PLACE_LIST: prefixRouteV1("venueSpaceList"),
  VENUE_PLACE_DETAIL: prefixRouteV1("venueSpaceDetail"),
  // VENUE_PLACE_CREATE: prefixRouteV1("addVenuePlace"),
  // VENUE_PLACE_UPDATE: prefixRouteV1("updateVenuePlace"),
  // VENUE_PLACE_REMOVE: prefixRouteV1("removeVenuePlace"),
  // VENUE_PLACE_LIST: prefixRouteV1("venuePlaceList"),

  // Venue Enquiry
  VENUE_PLACE_ENQUIRY: prefixRouteV1("getClientVenueEnquiryList"),
  VENUE_ENQUIRY_REMOVE: prefixRouteV1("removeVenueEnquiry"),

  // Venue Event Book
  VENUE_PLACE_EVENTBOOK: prefixRouteV1("getClientEventbook"),
  VENUE_EVENTBOOK_REMOVE: prefixRouteV1("removeVenueEnquiry"),

  // Contact
  CONTACTUS_LIST: prefixRouteV1("contactUsList"),
  REMOVE_CONTACTUS: prefixRouteV1("removeContact"),

  // Contact
  NEWSLETTERLIST_LIST: prefixRouteV1("getNewslettereList"),
  REMOVE_CONTACTUS: prefixRouteV1("removeContact"),

  //third party api to get city from lat lng
  GETCITYAPI: "https://nominatim.openstreetmap.org/reverse",
};

export default apiRouter;
