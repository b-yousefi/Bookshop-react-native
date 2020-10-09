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

import Input from "../UI/Input";
import Card from "../UI/Card";
import Colors from "../../constants/Colors";
import * as userActions from "../../store/actions/actions_user";
import User from "../../models/User";

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

const SignUpForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    inputValidities: {
      username: false,
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
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
    console.log(formState.inputValues);
    setError(null);
    setIsLoading(true);
    const {
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    } = formState.inputValues;
    const newUser = new User(
      undefined,
      username,
      email,
      firstName,
      lastName,
      phoneNumber,
      password
    );
    try {
      await dispatch(userActions.regsiterUser(newUser));
      // props.navigation.navigate("Shop");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  return (
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
            id="firstName"
            label="First Name"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Please enter a valid firs name"
            onInputChange={onInputChangedHandler}
            initialValue=""
          />
          <Input
            id="lastName"
            label="Last Name"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Please enter a valid last name"
            onInputChange={onInputChangedHandler}
            initialValue=""
          />
          <Input
            id="phoneNumber"
            label="Phone Number"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Please enter a valid phone number"
            onInputChange={onInputChangedHandler}
            initialValue=""
          />
          <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address"
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
          <View style={styles.action}>
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <Button
                  title="Sign Up"
                  color={Colors.primaryColor}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to Login"
                color={Colors.accentColor}
                onPress={props.onSwitch}
              />
            </View>
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "95%",
    maxWidth: 500,
    maxHeight: "100%",
    padding: 20,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop: 10,
    width: 140,
  },
});

export default SignUpForm;
