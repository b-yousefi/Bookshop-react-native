import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";

const AuthorsScreen = (props) => {
  return (
    <View>
      <Text>Authors Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AuthorsScreen;

AuthorsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Authors",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
