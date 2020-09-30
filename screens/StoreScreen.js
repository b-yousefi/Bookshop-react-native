import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";

const StoreScreen = (props) => {
  return (
    <View>
      <Text>Store Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default StoreScreen;

StoreScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Bookshop",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
