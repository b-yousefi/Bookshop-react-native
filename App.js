import React, { useState } from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { StyleSheet } from "react-native";

import * as Font from "expo-font";
import { AppLoading } from "expo";

import BookshopNavigator from "./navigation/BookshopNavigator";
import BooksReducer from "./store/reducers/BookReducer";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const rootReducer = combineReducers({
  books: BooksReducer,
});

const store = createStore(rootReducer);

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
