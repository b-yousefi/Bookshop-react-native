import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as publicationsActions from "../store/actions/actions_publicaion";

import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";
import PublicationItem from "../components/shop/PublicationItem";
import Colors from "../constants/Colors";

const PublicationsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const publications = useSelector((state) => state.publications);

  const dispatch = useDispatch();

  const loadPublications = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(publicationsActions.fetchPublications());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadPublications
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadPublications]);

  useEffect(() => {
    setIsLoading(true);
    loadPublications().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadPublications]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && (!publications || publications.length === 0)) {
    return (
      <View style={styles.centered}>
        <Text>No Publications found. Maybe start adding some!</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try Again"
          onPress={loadPublications}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "PublicationDetail",
      params: {
        publicationId: id,
        publicationTitle: title,
      },
    });
  };

  return (
    <FlatList
      onRefresh={loadPublications}
      refreshing={isRefreshing}
      data={publications}
      renderItem={(itemData) => (
        <PublicationItem
          title={itemData.item.name}
          url={itemData.item.website}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.name);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.name);
            }}
          />
        </PublicationItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default PublicationsScreen;

PublicationsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Publications",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
