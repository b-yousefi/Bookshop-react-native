import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  StyleSheet,
} from "react-native";

import Colors from "../constants/Colors";

const BookDetailScreen = (props) => {
  const bookId = props.route.params.bookId;
  const selectedBook = useSelector((state) =>
    state.books.books.find((book) => book.id === bookId)
  );
  return (
    <ScrollView>
      <View style={styles.book}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `data:image/jpeg;base64,${selectedBook.picture.data}`,
            }}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{selectedBook.name}</Text>
          <Text style={styles.summary}>{selectedBook.summary}</Text>
          {selectedBook.readablePublishedDay && (
            <Text style={styles.date}>
              Published Date: {selectedBook.readablePublishedDay}
            </Text>
          )}
          <Text style={styles.price}>Price: ${selectedBook.price}</Text>
        </View>
        <View style={styles.action}>
          <Button
            color={Colors.primary}
            title="Add To Cart"
            onPress={() => {
              // dispatch(bookActions.addToCart(selectedBook));
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  book: {
    padding: 20,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    maxHeight: 300,
    alignItems: "center",
    alignContent: "center",
  },
  image: {
    width: "50%",
    height: "100%",
  },
  details: {
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    paddingTop: 20,
    textAlign: "justify",
  },
  summary: {
    fontFamily: "open-sans",
    fontSize: 14,
    paddingVertical: 20,
    textAlign: "justify",
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#4d4949",
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#4d4949",
    paddingBottom: 10,
  },
  action: {},
});

export default BookDetailScreen;

export const screenOptions = (navData) => {
  const title = navData.route.params.bookTitle;

  return {
    headerTitle: title,
  };
};
