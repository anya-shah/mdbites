import { NavigationContainer, StackActions } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AuthStackScreen } from "./AuthStack/AuthStackScreen";
import { RootStackScreen } from "./RootStack/RootStackScreen";
import firebase from "firebase/compat/app";
import { onAuthStateChanged } from "firebase/auth";

import "firebase/compat/auth";
import "firebase/compat/firestore"
import { auth } from "../App"


import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { OpeningScreenMain } from "./Opening/OpeningScreenMain";

const Stack = createStackNavigator();
const StackOptions = { headerShown: false };



/* Note: it is VERY important that you understand
    how this screen works!!! Read the logic on this screen
    carefully (also reference App.js, the entry point of
    our application). 
    
    Associated Reading:
      https://reactnavigation.org/docs/auth-flow/
      https://rnfirebase.io/auth/usage 
*/
export function EntryStackScreen() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });
    return () => unsubscribe();
  }, [setUser]);

  if (initializing) {
    return <View />;
  } else if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={StackOptions}  
            name="Opening"  
            component={OpeningScreenMain} />
          <Stack.Screen 
            options={StackOptions}
            name="Auth" 
            component={AuthStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    //     </Stack.Navigator>
    //     <AuthStackScreen />
    //   </NavigationContainer>
    // );
  } else {
    return <RootStackScreen />;
  }
}
