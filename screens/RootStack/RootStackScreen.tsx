import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackScreen } from "./MainStack/MainStackScreen";
import NewPostScreen from "./NewPostScreen/NewPostScreen.main";
import { NavigationContainer } from "@react-navigation/native";

export type RootStackParamList = {
  Main: undefined;
  NewPostScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootStackScreen() {
  const options = { headerShown: false };
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ presentation: 'modal' }} initialRouteName="Main">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={options}
        />
        <RootStack.Screen
          name="NewPostScreen"
          options={options}
          component={NewPostScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
