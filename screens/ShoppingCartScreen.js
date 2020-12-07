import React from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet } from "react-native";

import OrderItem from "../components/shop/OrderItem";

const ShoppingCartScreen = (props) => {
  const orderItems = useSelector((state) => state.shopping_cart.orderItems);

  return (
    <FlatList
      data={orderItems}
      renderItem={(itemData) => (
        <OrderItem
          bookName={itemData.item.book.name}
          quantity={itemData.item.quantity}
          image={itemData.item.book.picture}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ShoppingCartScreen;

export const screenOptions = (navData) => {
  const title = "Shopping Cart";

  return {
    headerTitle: title,
  };
};
