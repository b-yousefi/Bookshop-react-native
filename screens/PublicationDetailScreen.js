import React from "react";
import { useSelector } from "react-redux";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import Anchor from "../components/UI/Anchor ";

const PublicationDetailScreen = (props) => {
  const publicationId = props.navigation.getParam("publicationId");
  const selectedPublication = useSelector((state) =>
    state.publications.find((publication) => publication.id === publicationId)
  );
  return (
    <ScrollView>
      <View style={styles.publication}>
        <Text style={styles.description}>
          {selectedPublication.description}
        </Text>
        <Anchor href={selectedPublication.website}>Go to Website</Anchor>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  publication: {
    height: "100%",
    padding: 20,
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    paddingVertical: 20,
    textAlign: "justify",
  },
});

export default PublicationDetailScreen;

PublicationDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("publicationTitle");

  return {
    headerTitle: title,
  };
};
