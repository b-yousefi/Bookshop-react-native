import React from "react";
import { Text, StyleSheet } from "react-native";
import * as Linking from "expo-linking";

export default class Anchor extends React.Component {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Text
        {...this.props}
        style={{ ...styles.link, ...this.props.style }}
        onPress={this._handlePress}
      >
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

// <Anchor href="https://google.com">Go to Google</Anchor>
// <Anchor href="mailto:support@expo.io">Email support</Anchor>
