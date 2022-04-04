import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import boatRegisterReducer from "./redux/boatRegisterSlice";
import profileReducer from "./redux/profileSlice";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const serverStore = configureStore({
  reducer: {
    boatRegister: boatRegisterReducer,
    profile: profileReducer,
  },
  middleware: customizedMiddleware,
  devTools: true,
});

const store = () => {
  const combinedReducer = combineReducers({
    boatRegister: boatRegisterReducer,
    profile: profileReducer,
  });

  const persistConfig = {
    key: "evenimex",
    storage,
    blacklist: [],
  };

  const persistedReducer = persistReducer(persistConfig, combinedReducer);

  const cstore = configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware,
  });

  cstore.__persistor = persistStore(cstore);
  return cstore;
};

const makeStore = ({ isServer }) => (isServer ? serverStore : store());

export const wrapper = createWrapper(makeStore);
