import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";
import BookItem from "../components/shop/BookItem";
import * as booksActions from "../store/actions/actions_book";

const StoreScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  const loadBooks = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(booksActions.fetchBooks());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadBooks);

    return () => {
      willFocusSub.remove();
    };
  }, [loadBooks]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "BookDetail",
      params: {
        BookId: id,
        BookTitle: title,
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

  if (!isLoading && !books) {
    return (
      <View style={styles.centered}>
        <Text>No Books found. Maybe start adding some!</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try Again"
          onPress={loadBooks}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadBooks}
      refreshing={isRefreshing}
      numColumns={Dimensions.get("window").width > 380 ? 2 : 1}
      data={books}
      renderItem={(itemData) => (
        <BookItem
          title={itemData.item.name}
          image={itemData.item.picture}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          {/* <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          /> */}
        </BookItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default StoreScreen;

StoreScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Bookshop",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
