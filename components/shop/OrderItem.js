import React from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { IconButton, Colors } from "react-native-paper";

import * as cartActions from "../../store/actions/actions_shopping_cart";

import Card from "../UI/Card";

const OrderItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const dispatch = useDispatch();

  return (
    <Card style={styles.orderItemCard}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={styles.orderItem}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: `data:image/jpeg;base64,${props.image.data}` }}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.name} numberOfLines={2}>
                {props.bookName}
              </Text>
              <View style={styles.detailsCol}>
                <View>
                  <Text style={styles.quantity}>
                    Quantity: {props.quantity}
                  </Text>
                  <Text style={styles.price}>Price: ${props.price}</Text>
                </View>
                {props.isEditable && (
                  <IconButton
                    icon="delete-outline"
                    color={Colors.red500}
                    size={36}
                    onPress={() => {
                      dispatch(
                        cartActions.deleteItemFromShoppingCart(props.id)
                      );
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItemCard: {
    height: 150,
    margin: 5,
    padding: 5,
    width: "95%",
    alignSelf: "center",
    maxWidth: 400,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 17,
    marginVertical: 2,
    padding: 5,
  },
  details: {
    padding: 5,
    width: "75%",
  },
  detailsCol: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    fontSize: 14,
    marginVertical: 2,
    padding: 5,
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    marginVertical: 2,
    padding: 5,
  },
  imageContainer: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default OrderItem;
