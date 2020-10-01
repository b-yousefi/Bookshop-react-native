import React, { useState } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxPromise from "redux-promise";
import ReduxThunk from "redux-thunk";

import * as Font from "expo-font";
import { AppLoading } from "expo";

import RootReducer from "./store/reducers/index";
import BookshopNavigator from "./navigation/BookshopNavigator";

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
      <BookshopNavigator />
    </Provider>
  );
}
