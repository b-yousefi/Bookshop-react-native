import React from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet } from "react-native";

import OrderItem from "../components/shop/OrderItem";

const ShoppingCartScreen = (props) => {
  const orderItems = useSelector((state) => state.shopping_cart.orderItems);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      name: "BookDetail",
      params: {
        bookId: id,
        bookTitle: title,
      },
    });
  };

  return (
    <FlatList
      data={orderItems}
      renderItem={(itemData) => (
        <OrderItem
          bookName={itemData.item.book.name}
          quantity={itemData.item.quantity}
          image={itemData.item.book.picture}
          price={itemData.item.book.price}
          id={itemData.item.id}
          onSelect={() => {
            selectItemHandler(itemData.item.book.id, itemData.item.book.name);
          }}
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
