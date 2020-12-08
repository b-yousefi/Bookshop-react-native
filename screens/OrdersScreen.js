import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ordersActions from "../store/actions/actions_order";

import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";
import OrderListItem from "../components/shop/OrderListItem";
import Colors from "../constants/Colors";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const orders = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focuse", loadOrders);

    return () => {
      unsubscribe();
    };
  }, [loadOrders]);

  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadOrders]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && (!orders || orders.length === 0)) {
    return (
      <View style={styles.centered}>
        <Text>No Orders found. Maybe start adding some!</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try Again"
          onPress={loadOrders}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      name: "OrderDetails",
      params: {
        orderId: id,
        orderTitle: title,
      },
    });
  };

  return (
    <FlatList
      onRefresh={loadOrders}
      keyExtractor={(item) => item.id.toString()}
      refreshing={isRefreshing}
      data={orders}
      renderItem={(itemData) => (
        <OrderListItem
          totalPrice={itemData.item.totalPrice}
          date={itemData.item.readableUpdatedAt}
          onSelect={() => {
            selectItemHandler(
              itemData.item.id,
              itemData.item.readableUpdatedAt
            );
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(
                itemData.item.id,
                itemData.item.readableUpdatedAt
              );
            }}
          />
        </OrderListItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default OrdersScreen;

export const screenOptions = (navData) => {
  return {
    headerTitle: "Orders",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
