import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, Text } from "react-native";

import Colors from "../constants/Colors";

import StoreScreen from "../screens/StoreScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import AuthorsScreen from "../screens/AuthorsScreen";
import PublicationsScreen from "../screens/PublicationsScreen";
import AboutScreen from "../screens/AboutScreen";
import PublicationDetailScreen from "../screens/PublicationDetailScreen";
import AuthorDetailScreen from "../screens/AuthorDetialScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import AuthScreen from "../screens/AuthScreen";

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

const StoreNavigator = createStackNavigator(
  {
    Store: StoreScreen,
    BookDetail: BookDetailScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-home" : "ios-home"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const CategoriesNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <MaterialIcons name="class" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const AuthorsNavigator = createStackNavigator(
  {
    Authors: AuthorsScreen,
    AuthorDetail: AuthorDetailScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-people" : "ios-people"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const PublicationsNavigator = createStackNavigator(
  {
    Publications: PublicationsScreen,
    PublicationDetail: PublicationDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const AboutNavigator = createStackNavigator(
  {
    About: AboutScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Store: StoreNavigator,
    Categories: CategoriesNavigator,
    Authors: AuthorsNavigator,
    Publications: PublicationsNavigator,
    About: AboutNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  // Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
