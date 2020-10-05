import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CategoryDetailScreen = (props) => {
  return (
    <View>
      <Text>CategoryDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CategoryDetailScreen;

CategoryDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("categoryTitle");

  return {
    headerTitle: title,
  };
};
