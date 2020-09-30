import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";

const CategoriesScreen = (props) => {
  return (
    <View>
      <Text>Categories Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CategoriesScreen;

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Categories",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
