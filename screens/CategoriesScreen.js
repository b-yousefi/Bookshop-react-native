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

import Colors from "../constants/Colors";
import DrawerHeaderButton from "../components/UI/DrawerHeaderButton";
import CategoryGridTile from "../components/shop/CategoryGridTile";
import * as categoriesActions from "../store/actions/actions_categories";
import { isNull } from "lodash";

const CategoriesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const categories = useSelector((state) =>
    state.categories.categories_arr.filter((category) => !category.parent)
  );

  const colors = [
    "#f5428d",
    "#f54242",
    "#f5a442",
    "#f5d142",
    "#368dff",
    "#41d95d",
    "#9eecff",
    "#b9ffb0",
    "#ffc7ff",
    "#47fced",
  ];
  const dispatch = useDispatch();
  const loadCategories = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(categoriesActions.fetchCategory());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsRefreshing, setIsLoading]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadCategories);

    return () => {
      unsubscribe();
    };
  }, [loadCategories]);

  useEffect(() => {
    setIsLoading(true);
    loadCategories().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCategories]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!isLoading && (!categories || categories.length === 0)) {
    return (
      <View style={styles.centered}>
        <Text>No Categories found. Maybe start adding some!</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try Again"
          onPress={loadCategories}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadCategories}
      numColumns={2}
      refreshing={isRefreshing}
      data={categories}
      renderItem={(itemData) => (
        <CategoryGridTile
          title={itemData.item.name}
          //itemData.index % colors.length]
          color={colors[itemData.index % colors.length]}
          onSelect={() => {
            props.navigation.navigate({
              name: "CategoryDetail",
              params: {
                categoryId: itemData.item.id,
                categoryTitle: itemData.item.name,
              },
            });
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default CategoriesScreen;

export const screenOptions = (navData) => {
  return {
    headerTitle: "Categories",
    headerLeft: () => <DrawerHeaderButton navigation={navData.navigation} />,
  };
};
