import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
// import firebase from "firebase";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App";
import { AppStyles } from "../../AppStyles"

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignInScreen">;
}

export default function SignInScreen({ navigation }: Props) {
  /* Screen Requirements:
      - AppBar
      - Email & Password Text Input
      - Submit Button
      - Sign Up Button (goes to Sign Up screen)
      - Reset Password Button
      - Snackbar for Error Messages
  
    All UI components on this screen can be found in:
      https://callstack.github.io/react-native-paper/

    All authentication logic can be found at:
      https://firebase.google.com/docs/auth/web/starts
  */

  // state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
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
      <Appbar.Header style={{alignSelf: 'center', backgroundColor: "#79DFFF"}}>
        <View style={AppStyles.openingText}>
            <Text style={AppStyles.openingMD}>md</Text>
            <Text style={AppStyles.openingBites}>bites</Text>   
        </View>
      </Appbar.Header>
    );
  };

  

  // sign in a user or error if they don't exist
  useEffect(() => {
    if (signingIn) {
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('User account created and signed in!');
      })
      .catch(error => {
        console.log(error);
        setMessage("Please use valid login information.");
      });
    }
      setSigningIn(false);
      setMessage("");
  }, [signingIn]);

  // reset a user's password
  useEffect(() => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setMessage('A password reset link has been sent to your email.');
    })
    .catch((error) => {
      if (error.code === 'auth/invalid-email' && resettingPassword === true) {
        console.log('That email address is invalid!');
        setMessage("Please use a valid email address.");
      }
    });
    setResettingPassword(false);
    setMessage("");
  }, [resettingPassword]);

  return (
    <>
      <Bar />
      <SafeAreaView style={styles.container}>

        <TextInput
          label="email address"
          value={email}
          onChangeText={(input) => setEmail(input)}
          style={styles.input}
          autoComplete={false}
          mode="flat"
          underlineColor='black'
          selectionColor='black'
          activeUnderlineColor='black'
          placeholderTextColor='black'
        />

        <TextInput
          label="password"
          value={password}
          onChangeText={(input) => setPassword(input)}
          style={styles.input}
          autoComplete={false}
          secureTextEntry={true}
          underlineColor='black'
          selectionColor='black'
          activeUnderlineColor='black'
          placeholderTextColor='black'
        />

        <Button
          mode="contained"
          style={styles.signInButton}
          onPress={() => {setSigningIn(true)}}>
          <Text>Sign In</Text>
        </Button>

        <Button 
          onPress={() => {navigation.navigate("SignUpScreen")}}
          style={styles.button}>
          <Text style={{color: 'black'}}>
            Create an account
          </Text>
        </Button>

        <Button 
          style={styles.button}
          color={"grey"}
          onPress={() => setResettingPassword(true)}>
          <Text style={{color: 'black'}}>
            Reset Password
          </Text>
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
    backgroundColor: "#79DFFF",
  },
  input: {
    marginTop: 50,
    marginHorizontal: 15,
    backgroundColor: "#79DFFF",
    width: '80%',
    alignSelf: 'center',
  },
  signInButton: {
    width: '90%', 
    alignSelf: "center",
    backgroundColor: 'black',
    borderRadius: 30,
    marginTop: '15%',
    marginBottom: '30%'
  },
  button: {
    marginTop: '10%'
  },
  snackbar: {
    marginBottom: 50
  },
});
