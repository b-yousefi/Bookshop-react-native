import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";

import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import SignUpForm from "../components/shop/SignUpForm";
import Colors from "../constants/Colors";
import * as userActions from "../store/actions/actions_user";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValue = { ...state.inputValues, [action.input]: action.value };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValue,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: "",
    },
    inputValidities: {
      username: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const onInputChangedHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    if (!isSignup) {
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(
          userActions.loginUser(
            formState.inputValues.username,
            formState.inputValues.password
          )
        );
        props.navigation.navigate("Shop");
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  const toggleFormHandler = () => {
    setIsSignup((prevState) => !prevState);
  };

  const loginForm = (
    <KeyboardAvoidingView
      //   behavior="padding"
      //   keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="username"
            label="Username"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Please enter a valid username"
            onInputChange={onInputChangedHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password"
            onInputChange={onInputChangedHandler}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primaryColor} />
            ) : (
              <Button
                title="Login"
                color={Colors.primaryColor}
                onPress={authHandler}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Switch to Sing Up"
              color={Colors.accentColor}
              onPress={toggleFormHandler}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );

  if (isSignup) {
    return (
      <SignUpForm onSwitch={toggleFormHandler} navigation={props.navigation} />
    );
  } else {
    return loginForm;
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};
