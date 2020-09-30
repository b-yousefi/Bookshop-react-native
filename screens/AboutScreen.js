import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";

const AboutScreen = (props) => {
  return (
    <View>
      <Text>About Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AboutScreen;

AboutScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "About",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
