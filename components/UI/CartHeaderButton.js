import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Platform } from "react-native";

import HeaderButton from "./HeaderButton";

const CartHeaderButton = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Cart"
        iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
        onPress={() => {
          props.navigation.navigate({
            name: "Cart",
          });
        }}
      />
    </HeaderButtons>
  );
};

export default CartHeaderButton;
