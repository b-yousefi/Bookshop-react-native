import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Button,
} from "react-native";

import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";
import BookItem from "../components/shop/BookItem";
import * as booksActions from "../store/actions/actions_book";
import Colors from "../constants/Colors";
import CartHeaderButton from "../components/UI/CartHeaderButton";

const StoreScreen = (props) => {
  const [page, setPage] = useState(1);
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
      setPage(2);
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  const loadMore = async () => {
    setIsRefreshing(true);
    try {
      await dispatch(booksActions.filterBooksByPage(page));
      setPage((currentPage) => currentPage + 1);
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadBooks);

    return () => {
      unsubscribe();
    };
  }, [loadBooks]);

  useEffect(() => {
    setIsLoading(true);
    loadBooks().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadBooks]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      name: "BookDetail",
      params: {
        bookId: id,
        bookTitle: title,
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

  if (!isLoading && (!books || books.length === 0)) {
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
      onEndReached={loadMore}
      onEndReachedThreshold={0}
      renderItem={(itemData) => (
        <BookItem
          title={itemData.item.name}
          image={itemData.item.picture}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.name);
          }}
        >
          <View style={styles.button}>
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.name);
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={() => {
                // dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </View>
        </BookItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: { width: 120 },
});

export default StoreScreen;

export const screenOptions = (navData) => {
  return {
    headerTitle: "Bookshop",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
    headerRight: () => <CartHeaderButton navigation={navData.navigation} />,
  };
};
