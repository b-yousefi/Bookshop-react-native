import React, { useState } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxPromise from "redux-promise";
import ReduxThunk from "redux-thunk";
import axios from "axios";

import * as Font from "expo-font";
import { AppLoading } from "expo";

import RootReducer from "./store/reducers/index";
import AppNavigator from "./navigation/AppNavigator";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const store = createStore(
  RootReducer,
  applyMiddleware(ReduxPromise, ReduxThunk)
);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
