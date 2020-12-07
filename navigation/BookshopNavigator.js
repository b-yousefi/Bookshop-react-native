import React from "react";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, SafeAreaView, View, Button, Text } from "react-native";
import { IconButton } from "react-native-paper";

import Colors from "../constants/Colors";

import StoreScreen, {
  screenOptions as storeScreenOptions,
} from "../screens/StoreScreen";
import CategoriesScreen, {
  screenOptions as categoriesScreenOptions,
} from "../screens/CategoriesScreen";
import AuthorsScreen, {
  screenOptions as authorScreenOptions,
} from "../screens/AuthorsScreen";
import PublicationsScreen, {
  screenOptions as publicationScreenOptions,
} from "../screens/PublicationsScreen";
import AboutScreen from "../screens/AboutScreen";
import PublicationDetailScreen, {
  screenOptions as publicationDetailScreenOptions,
} from "../screens/PublicationDetailScreen";
import AuthorDetailScreen, {
  screenOptions as authorDetailScreenOptions,
} from "../screens/AuthorDetialScreen";
import BookDetailScreen, {
  screenOptions as bookDetailScreenOptions,
} from "../screens/BookDetailScreen";
import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/AuthScreen";
import CategoryDetailScreen, {
  screenOptions as categoryDetailScreenOptions,
} from "../screens/CategoryDetailScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/OrdersScreen";
import ShoppingCartScreen, {
  screenOptions as shoppingCartScreenOptions,
} from "../screens/ShoppingCartScreen";

import * as userActions from "../store/actions/actions_user";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};

const StoreStackNavigator = createStackNavigator();

export const StoreNavigator = () => {
  return (
    <StoreStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <StoreStackNavigator.Screen
        name="Store"
        component={StoreScreen}
        options={storeScreenOptions}
      />
      <StoreStackNavigator.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={bookDetailScreenOptions}
      />
      <StoreStackNavigator.Screen
        name="Cart"
        component={ShoppingCartScreen}
        options={shoppingCartScreenOptions}
      />
    </StoreStackNavigator.Navigator>
  );
};

const AuthorsStackNavigator = createStackNavigator();

export const AuthorsNavigator = () => {
  return (
    <AuthorsStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <AuthorsStackNavigator.Screen
        name="Authors"
        component={AuthorsScreen}
        options={authorScreenOptions}
      />
      <AuthorsStackNavigator.Screen
        name="AuthorDetail"
        component={AuthorDetailScreen}
        options={authorDetailScreenOptions}
      />
    </AuthorsStackNavigator.Navigator>
  );
};

const PublicationsStackNavigator = createStackNavigator();

export const PublicationsNavigator = () => {
  return (
    <PublicationsStackNavigator.Navigator
      screenOptions={defaultStackNavOptions}
    >
      <PublicationsStackNavigator.Screen
        name="Publications"
        component={PublicationsScreen}
        options={publicationScreenOptions}
      />
      <PublicationsStackNavigator.Screen
        name="PublicationDetail"
        component={PublicationDetailScreen}
        options={publicationDetailScreenOptions}
      />
    </PublicationsStackNavigator.Navigator>
  );
};

const CategoriesStackNavigator = createStackNavigator();

export const CategoriesNavigator = () => {
  return (
    <CategoriesStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <CategoriesStackNavigator.Screen
        name="Categories"
        component={CategoriesScreen}
        options={categoriesScreenOptions}
      />
      <CategoriesStackNavigator.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={categoryDetailScreenOptions}
      />
    </CategoriesStackNavigator.Navigator>
  );
};

const OrderStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <OrderStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrderStackNavigator.Navigator>
  );
};

const AboutStackNavigator = createStackNavigator();

export const AboutNavigator = () => {
  return (
    <AboutStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <AboutStackNavigator.Screen name="About" component={AboutScreen} />
    </AboutStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.accentColor,
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <DrawerItemList {...props} />
              <IconButton
                icon="logout"
                title="logout"
                color={Colors.primaryColor}
                size={23}
                onPress={() => dispatch(userActions.logoutUser())}
              />
            </SafeAreaView>
          </View>
        );
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Store"
        component={StoreNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-home" : "ios-home"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Categories"
        component={CategoriesNavigator}
        options={{
          drawerIcon: (props) => (
            <MaterialIcons name="class" size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Authors"
        component={AuthorsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-people" : "ios-people"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Publications"
        component={PublicationsNavigator}
      />
      <ShopDrawerNavigator.Screen name="Orders" component={OrdersNavigator} />
      <ShopDrawerNavigator.Screen name="About" component={AboutNavigator} />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
