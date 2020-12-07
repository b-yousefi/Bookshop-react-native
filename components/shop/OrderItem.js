import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../UI/Card";

const OrderItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

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
              <Text style={styles.name}>{props.bookName}</Text>
              <Text style={styles.quantity}>Quantity: {props.quantity}</Text>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItemCard: {
    height: 120,
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
    width: "100%",
  },
  quantity: {
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default OrderItem;
