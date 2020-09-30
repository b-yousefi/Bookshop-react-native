import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";

import HeaderButton from "./HeaderButton";

const DrawerHeaderButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  );
};

export default DrawerHeaderButton;
