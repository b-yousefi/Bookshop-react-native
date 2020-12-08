import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import OrderItem from "../components/shop/OrderItem";
import * as ordersActions from "../store/actions/actions_order";
import Colors from "../constants/Colors";

const OrderDetailsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const orderId = props.route.params.orderId;
  const selectedOrder = useSelector((state) =>
    state.orders.find((order) => order.id === orderId)
  );

  const loadOrder = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(ordersActions.fetchOrderDetail(selectedOrder));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsRefreshing]);

  useEffect(() => {
    setIsLoading(true);
    loadOrder().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadOrder]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && (!selectedOrder || selectedOrder.items.length === 0)) {
    return (
      <View style={styles.centered}>
        <Text>No Order Item found. Maybe start adding some!</Text>
      </View>
    );
  }

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
    <View>
      <FlatList
        style={styles.list}
        onRefresh={loadOrder}
        refreshing={isRefreshing}
        data={selectedOrder.items}
        renderItem={(itemData) => (
          <OrderItem
            isEditable={false}
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
        <Text style={styles.totalPrice}>
          Total Price: ${selectedOrder.totalPrice}
        </Text>
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

export default OrderDetailsScreen;

export const screenOptions = (navData) => {
  const title = navData.route.params.orderTitle;

  return {
    headerTitle: title,
  };
};
