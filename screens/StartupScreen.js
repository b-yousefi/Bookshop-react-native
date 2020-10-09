import React, { useEffect } from "react";
import {
  View,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as userActions from "../store/actions/actions_user";
import { LOGIN_STATE } from "../store/reducers/reducer_user";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(userActions.setDidTryAL());
        // props.navigation.navigate("Auth");
        return;
      }
      const transfromedData = JSON.parse(userData);
      const { token, username } = transfromedData;

      if (!token || !username) {
        dispatch(userActions.setDidTryAL());
        // props.navigation.navigate("Auth");
        return;
      }
      // props.navigation.navigate("Shop");
      dispatch(userActions.authenticate(username, token));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator color={Colors.primaryColor} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default StartupScreen;
