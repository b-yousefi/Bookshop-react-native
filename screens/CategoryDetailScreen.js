import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as categoriesActions from "../store/actions/actions_categories";
import CategoryItem from "../components/shop/CategoryItem";

import Colors from "../constants/Colors";

const CategoryDetailScreen = (props) => {
  const categoryId = props.navigation.getParam("categoryId");

  const categories = useSelector((state) =>
    state.categories.categories_arr.filter(
      (category) => category.parent === categoryId
    )
  );

  const selectedCategory = useSelector((state) =>
    state.categories.categories_arr.find(
      (category) => category.id === categoryId
    )
  );

  return (
    <ScrollView>
      <View style={styles.category}>
        <Text style={styles.description}>{selectedCategory.description}</Text>
        <View style={styles.subCategories}>
          <Text style={styles.title}>SubCategories</Text>
          <View style={styles.list}>
            {categories.map((category) => (
              <CategoryItem
                key={category.id.toString()}
                name={category.name}
                onSelect={() => {
                  props.navigation.push("CategoryDetail", {
                    categoryId: category.id,
                    categoryTitle: category.name,
                  });
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  category: { padding: 10 },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "justify",
  },
  subCategories: {
    marginVertical: 5,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: Colors.primaryColor,
  },
  list: {
    marginVertical: 5,
  },
});

export default CategoryDetailScreen;

CategoryDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("categoryTitle");

  return {
    headerTitle: title,
  };
};
