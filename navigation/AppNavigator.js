import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { ShopNavigator, AuthNavigator } from "./BookshopNavigator";
import StartupScreen from "../screens/StartupScreen";

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => state.user.isLoggedIn);
  const didTryAutoLogin = useSelector((state) => state.user.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
