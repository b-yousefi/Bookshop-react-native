import React from "react";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform, SafeAreaView, View, Button, Text } from "react-native";
import { IconButton } from "react-native-paper";

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
import StartupScreen from "../screens/StartupScreen";

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
    contentComponent: (props) => {
      const dispatch = useDispatch();
      console.log(props.navigationOptions);
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
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
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
