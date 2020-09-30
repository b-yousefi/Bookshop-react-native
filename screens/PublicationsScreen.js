import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";

const PublicationsScreen = (props) => {
  return (
    <View>
      <Text>Store Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PublicationsScreen;

PublicationsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Publications",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
