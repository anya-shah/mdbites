import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
// import firebase from "firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App";

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignUpScreen">;
}

export default function SignUpScreen({ navigation }: Props) {
  /* Screen Requirements:
      - AppBar
      - Email & Password Text Input
      - Submit Button
      - Sign In Button (goes to Sign In Screen)
      - Snackbar for Error Messages
  
    All UI components on this screen can be found in:
      https://callstack.github.io/react-native-paper/

    All authentication logic can be found at:
      https://firebase.google.com/docs/auth/web/start
  */

  // state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = useState("");

  // snackbar toggles
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // poke snackbar using message
  useEffect(() => {
    if (message !== "") {
      onToggleSnackBar();
    }
  }, [message]);

  // appbar
  const Bar = () => {
    return (
      <Appbar.Header >
        <Appbar.Content title="Create an Account" />
      </Appbar.Header>
    );
  };
  
  // create a user or error if invalid effort
  useEffect(() => {
    if (creatingAccount) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setMessage("Please use a valid email address.");
          }
        });
      }
      setCreatingAccount(false);
      setMessage("");
  
  }, [creatingAccount]);

  
  return (
    <>
      <Bar />
      <SafeAreaView style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(input) => setEmail(input)}
          style={{ backgroundColor: "white", marginBottom: 10, marginTop: 20, marginLeft: 15, marginRight: 15 }}
          autoComplete={false}
          mode="flat"
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={(input) => setPassword(input)}
          style={{ backgroundColor: "white", marginBottom: 30, marginLeft: 15, marginRight: 15 }}
          autoComplete={false}
          secureTextEntry={true}
        />

        <Button 
          mode="contained"
          style={{ width: 350, alignSelf: "center" }}
          onPress={ () => setCreatingAccount(true) }>
          <Text>Create An Account</Text>
        </Button>

        <Button 
          onPress={() => {navigation.navigate("SignInScreen")}}
          style={styles.button}>
          <Text>Or, sign in instead</Text>
        </Button>

        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={ styles.snackbar }
          >
          {message}
        </Snackbar>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#ffffff",
  },
  button: {
    marginTop: 20,
  }, 
  snackbar: {
    marginBottom: 50
  }
});
