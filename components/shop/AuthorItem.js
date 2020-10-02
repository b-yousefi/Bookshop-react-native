import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from "react-native";

import Card from "../UI/Card";

const AuthorItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.book}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: `data:image/jpeg;base64,${props.image.data}` }}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.birthday}>{props.birthday}</Text>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  book: {
    height: Dimensions.get("window").height / 2.5,
    margin: 10,
    width: "45%",
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
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
  details: {
    alignItems: "flex-start",
    height: "40%",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  birthday: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888",
  },
});

export default AuthorItem;
