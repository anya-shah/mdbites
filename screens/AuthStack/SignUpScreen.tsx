import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
// import firebase from "firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AppStyles } from "../../AppStyles";


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
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = useState("");

  // snackbar toggles
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // poke snackbar using message
  useEffect(() => {
    if (message !== "") {
      onToggleSnackBar();
      console.log('heyldsak');
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
  
  // move to setup or error if invalid effort
  const verify = () => {
    if (email === '') {
      setMessage('Please enter an email address!');
      console.log(dsajfil);
    } else {
      navigation.navigate("ProfileSetupScreen", {username: email, password: password});
    }
  }
  

  
  return (
    <>
      <Bar />
      <SafeAreaView style={styles.container}>
        <TextInput
          label="email address"
          value={email}
          onChangeText={(input) => setEmail(input)}
          style={styles.input}
          // style={{ backgroundColor: "white", marginBottom: 10, marginTop: 20, marginLeft: 15, marginRight: 15 }}
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
          // style={{ backgroundColor: "white", marginBottom: 30, marginLeft: 15, marginRight: 15 }}
          autoComplete={false}
          secureTextEntry={true}
          underlineColor='black'
          selectionColor='black'
          activeUnderlineColor='black'
          placeholderTextColor='black'
        />

        <Button 
          mode="contained"
          style={styles.createAccountButton}
          // style={{ width: 350, alignSelf: "center" }}
          onPress={() => verify() }>next
       
          {/* <Text>Set up profile</Text> */}
        </Button>

        <Button 
          onPress={() => {navigation.navigate("SignInScreen")}}
          style={styles.button}>
          <Text style={{color: 'black'}}>
            Or, sign in instead
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
  createAccountButton: {
    width: '90%', 
    alignSelf: "center",
    backgroundColor: 'black',
    borderRadius: 30,
    marginTop: '15%',
    marginBottom: '30%',
  }, 
  snackbar: {
    marginBottom: 50
  },
  button: {
    marginTop: '10%'
  },
  input: {
    marginTop: 50,
    marginHorizontal: 15,
    backgroundColor: "#79DFFF",
    width: '80%',
    alignSelf: 'center',
  },
});
