import React from "react";
import { useSelector } from "react-redux";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

const AuthorDetailScreen = (props) => {
  const authorId = props.route.params.authorId;
  const selectedAuthor = useSelector((state) =>
    state.authors.find((author) => author.id === authorId)
  );
  return (
    <ScrollView>
      <View style={styles.author}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `data:image/jpeg;base64,${selectedAuthor.picture.data}`,
            }}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.description}>{selectedAuthor.description}</Text>
          <Text>{selectedAuthor.readableBirthdayDate}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  author: {
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
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    paddingVertical: 20,
    textAlign: "justify",
  },
});

export default AuthorDetailScreen;

export const screenOptions = (navData) => {
  const title = navData.route.params.authorTitle;

  return {
    headerTitle: title,
  };
};
