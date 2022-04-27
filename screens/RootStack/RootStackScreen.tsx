import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NewPostScreen from "./NewPostScreen/NewPostScreen.main";
import { NavigationContainer } from "@react-navigation/native";
import ForYouScreen from "./MainStack/ForYouScreen";
import RouletteScreen from "./MainStack/RouletteScreen";
import FeedScreen from "./MainStack/FeedScreen/FeedScreen.main";
import DetailScreen from "./MainStack/DetailScreen/DetailScreen.main";

export type RootStackParamList = {
  Main: undefined;
  NewPostScreen: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export function RootStackScreen() {
  const options = { headerShown: false };
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Main">
        <RootStack.Screen
        name="FeedScreen"
        options={{ headerShown: false }}
        component={FeedScreen}
      />
      <RootStack.Screen
        name="DetailScreen"
        options={{ headerShown: false }}
        component={DetailScreen}
      />
        <RootStack.Screen
          name="NewPostScreen"
          options={options}
          component={NewPostScreen}
        />
        <RootStack.Screen
          name="ForYouScreen"
          options={options}
          component={ForYouScreen}
        />
        <RootStack.Screen
          name="RouletteScreen"
          options={options}
          component={RouletteScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
