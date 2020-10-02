import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from "react-native";

import Anchor from "../UI/Anchor ";
import Card from "../UI/Card";

const PublicationItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.publication}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Anchor href={props.url} style={styles.url}>
                Go to Website
              </Anchor>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  publication: {
    height: 150,
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
    height: "70%",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
  },
  url: {
    fontFamily: "open-sans",
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
});

export default PublicationItem;
