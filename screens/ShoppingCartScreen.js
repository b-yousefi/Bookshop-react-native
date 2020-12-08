import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, View, Text, StyleSheet } from "react-native";

import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";
import * as shopingcartActions from "../store/actions/actions_shopping_cart";
import OrderItem from "../components/shop/OrderItem";
import Colors from "../constants/Colors";

const ShoppingCartScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const orderItems = useSelector((state) => state.shopping_cart.orderItems);
  const totalPrice = useSelector((state) => state.shopping_cart.totalPrice);

  const loadShoppingCart = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(shopingcartActions.fetchShoppingCart());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsRefreshing]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      name: "BookDetail",
      params: {
        bookId: id,
        bookTitle: title,
      },
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try Again"
          onPress={loadShoppingCart}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        style={styles.list}
        data={orderItems}
        onRefresh={loadShoppingCart}
        refreshing={isRefreshing}
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
      <View style={styles.totalPriceBar}>
        <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: {
    height: "90%",
  },
  totalPriceBar: {
    height: "10%",
    backgroundColor: "orange",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  totalPrice: {
    color: "white",
    textAlign: "center",
  },
});

export default ShoppingCartScreen;

export const screenOptions = (navData) => {
  const title = "Shopping Cart";

  return {
    headerTitle: title,
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
