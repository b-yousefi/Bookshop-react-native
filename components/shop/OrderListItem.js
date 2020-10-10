import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Card from "../UI/Card";

const OrderListItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.order}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.details}>
              <Text style={styles.totalPrice}>
                Total Price: ${props.totalPrice}
              </Text>
              <Text style={styles.date}>{props.date}</Text>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  order: {
    margin: 10,
    width: "95%",
    alignSelf: "center",
    maxWidth: 400,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  details: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  totalPrice: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 14,
  },
});

export default OrderListItem;
