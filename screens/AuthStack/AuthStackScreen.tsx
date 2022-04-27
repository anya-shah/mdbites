import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import ProfileSetupScreen from "./ProfileSetupScreen";
import FeedScreen from "../RootStack/MainStack/FeedScreen/FeedScreen.main";
export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  ProfileSetupScreen: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export function AuthStackScreen() {
  const options = { headerShown: false };
  return (
    <AuthStack.Navigator>
      
      <AuthStack.Screen
        name="SignInScreen"
        options={options}
        component={SignInScreen}
      />

      <AuthStack.Screen
        name="SignUpScreen"
        options={options}
        component={SignUpScreen}
      />

      <AuthStack.Screen
        name="ProfileSetupScreen"
        options={options}
        component={ProfileSetupScreen}
      />

      <AuthStack.Screen
        name = "FeedScreenTwo"
        options={options}
        component={FeedScreen}
      />


    </AuthStack.Navigator>
  );
}
