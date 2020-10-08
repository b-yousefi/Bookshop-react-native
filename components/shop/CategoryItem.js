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

const CategoryItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.category}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <Text style={styles.name}>{props.name}</Text>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  category: {
    height: 50,
    margin: 5,
    width: "95%",
    alignSelf: "center",
    maxWidth: 400,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
    padding: 10,
  },
});

export default CategoryItem;
