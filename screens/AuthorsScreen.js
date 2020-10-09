import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../constants/Colors";
import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";
import * as authorsActions from "../store/actions/action_authors";
import AuthorItem from "../components/shop/AuthorItem";

const AuthorsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors);

  const loadAuthors = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(authorsActions.fetchAuthors());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadAuthors);

    return () => {
      unsubscribe();
    };
  }, [loadAuthors]);

  useEffect(() => {
    setIsLoading(true);
    loadAuthors().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadAuthors]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      name: "AuthorDetail",
      params: {
        authorId: id,
        authorTitle: title,
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && (!authors || authors.length === 0)) {
    return (
      <View style={styles.centered}>
        <Text>No Authors found. Maybe start adding some!</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try Again"
          onPress={loadAuthors}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadAuthors}
      refreshing={isRefreshing}
      // numColumns={Dimensions.get("window").width > 380 ? 2 : 1}
      data={authors}
      numColumns={2}
      renderItem={(itemData) => (
        <AuthorItem
          title={itemData.item.fullName}
          image={itemData.item.picture}
          birthday={itemData.item.readableBirthdayDate}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.fullName);
          }}
        ></AuthorItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  buttonContainer: { alignItems: "center", flex: 1 },
});

export default AuthorsScreen;

export const screenOptions = (navData) => {
  return {
    headerTitle: "Authors",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
