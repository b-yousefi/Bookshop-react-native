import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import BookshopNavigator from "./BookshopNavigator";

const NavigationContainer = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    // Alert.alert("Effect",'Token: ' + auth.token, [{ text: "Okay" }]);
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <BookshopNavigator ref={navRef} />;
};

export default NavigationContainer;
