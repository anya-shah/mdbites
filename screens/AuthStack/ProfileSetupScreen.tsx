import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, Provider as PaperProvider, Snackbar, TextInput } from 'react-native-paper';
import ButtonBlack from '../../ButtonBlack';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';
import RestaurantCard from '../../RestaurantCard';
import * as ImagePicker from "expo-image-picker";
import { auth } from "../../App";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AppStyles } from '../../AppStyles';

// Code for ImagePicker (from docs)



export default function ProfileSetupScreen(props: { navigation?: any; route?: any; }) {
    const {navigation, route} = props;
    const {email, password} = route.params;
    // const { navigation } = props;

    const [priceRange, setPriceRange] = useState(0);
    const [nickName, setnickName] = useState("");
    const [distance, setDistance] = useState(0);
    const [eventImage, setEventImage] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [creatingAccount, setCreatingAccount] = useState(false);

    const [visible, setVisible] = React.useState(false);
    const [message, setMessage] = useState("");

    // snackbar toggles
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    // appbar
    const Bar = () => {
        return (
        <Appbar.Header style={{alignSelf: 'flex-start', backgroundColor: "#79DFFF"}}>
            <Appbar.Action
            icon="arrow-left"
            onPress={() => navigation.goBack()}
            style={{marginRight: 40}}
            />
            <View style={{flexDirection: 'row', position: 'absolute', marginHorizontal: '35%'}}>
                <Text style={AppStyles.openingMD}>md</Text>
                <Text style={AppStyles.openingBites}>bites</Text>
            </View>
        </Appbar.Header>
        );
    };

    // poke snackbar using message
    useEffect(() => {
        if (message !== "") {
        onToggleSnackBar();
        }
    }, [message]);


    useEffect(() => {
        if (creatingAccount) {
          createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.error('That email address is already in use!');
                setMessage('DJSAKFJ;!');
              }
    
              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                setMessage("Please use a valid email address.");
              } else {
                setMessage('hey');
              }
            });
          }
          setCreatingAccount(false);
        //   setMessage("");
      
      }, [creatingAccount]);
      
    const pickImage = async () => {
        console.log("picking image");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log("done");
        if (!result.cancelled) {
            // setEventImage(result.uri);
        }
    };
    return (
        <PaperProvider>
            <Bar />
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>

                        {/* STEP 1: CUISINE SCROLLVIEW */}
                        <View style={{marginVertical: 30}}>
                            <View style={{alignSelf: 'center'}} >
                                <ButtonBlack text="1: What kind of food do you like?"/>
                            </View>
                            <View style={styles.scrollView}>
                                <ScrollView directionalLockEnabled={true}>
                                    <View style={styles.containerRestaurant}>
                                        {restaurantData.map((restaurant, index) => (
                                            <RestaurantCard key={index} name={restaurant.name} image={restaurant.image} />
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>

                        {/* STEP 2: SPENDING SLIDER */}
                        <View style={{marginVertical: 30}}>
                            <View style={{alignSelf: 'center'}}>
                                <ButtonBlack text="2: How much do you usually spend?" width='100%'/>
                            </View>
                            <Text style={{ marginTop: 10, alignSelf: "center" }}>${priceRange}</Text>
                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <Text style={{marginLeft: 15}}>$0  </Text>
                                <Slider
                                    style={{width: '70%'}}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor="white"
                                    maximumTrackTintColor="black"
                                    value={priceRange}
                                    onValueChange={(value) => setPriceRange(Math.round(value))}
                                />
                                <Text style={{marginRight: 15}}>$100</Text>
                            </View>
                        </View>

                        {/* STEP 3: DISTANCE SLIDER */}
                        <View style={{ marginVertical: 30 }}>
                            <View style={{alignSelf: 'center'}}>
                                <ButtonBlack text="3: How far do you usually go?"/>
                            </View>
                            <Text style={{ marginTop: 10, alignSelf: "center" }}>{distance} miles</Text>
                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                <Text style={{marginLeft: 15}}>0 mi  </Text>
                                <Slider
                                    style={{ width: '70%' }}
                                    minimumValue={0}
                                    maximumValue={100}
                                    minimumTrackTintColor="white"
                                    maximumTrackTintColor="black"
                                    value={distance}
                                    onValueChange={(value) => setDistance(Math.round(value))}
                                />
                                <Text style={{marginRight: 15}}>100 mi</Text>
                            </View>
                        </View>

                        {/* STEP 4: NICKNAME ENTRY */}
                        <View style={{marginVertical: 30, alignItems: 'center', width: '100%'}}>
                            <View style={{alignSelf: 'center'}}>
                                <ButtonBlack text="4: What do your friends call you?" />
                            </View>
                            <View style={{width: 325, marginVertical: 10}}>
                                <TextInput
                                    style={styles.input}
                                    label="name"
                                    value={nickName}
                                    onChangeText={nickName => setnickName(nickName)}
                                    autoComplete={false}
                                    secureTextEntry={false}
                                    underlineColor='black'
                                    selectionColor='black'
                                    activeUnderlineColor='black'
                                    placeholderTextColor='black'
                                />
                            </View>
                        </View>

                        {/* STEP 5: IMAGE PICKER */}
                        <View style={{ marginVertical: 30 }}>
                            <ButtonBlack text="5: (Optional) Add a profile picture" />
                            <Button 
                                mode="outlined" 
                                onPress={pickImage} 
                                style={{ marginTop: 20, backgroundColor: 'white', borderRadius: 50, width: '50%', alignSelf: 'center' }} 
                                color='black'>
                                {eventImage ? "Change Image" : "Pick an Image"}
                            </Button>
                        </View>

                        {/* STEP 6: ADD FRIENDS SCROLLVIEW */}
                        <View style={{ marginVertical: 30 }}>
                            <ButtonBlack text="6: (optional) Add your friends" />
                            <View style={ styles.scrollView }>
                                <ScrollView >
                                    <View style={styles.containerRestaurant}>
                                        {usersData.map((user, index) => (
                                            <RestaurantCard key={index} name={user.name} image={user.image}/>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>

                        <Button
                            mode="contained"
                            onPress={() => setCreatingAccount(true) }
                            style={styles.submitButton}
                            loading={loading}
                        >
                            Submit
                        </Button>

                    </View>
                </ScrollView>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    style={ styles.snackbar }
                    >
                    {message}
                </Snackbar>
            </SafeAreaView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#79DFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerRestaurant: {
        backgroundColor: "black",
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        borderRadius: 30,
        width: '95%',
        alignSelf: 'center',
    },
    square: {
        backgroundColor: "#79DFFF",
        width: 100,
        height: 100,
        margin: 25,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        height: 50,
        marginHorizontal: 15,
        backgroundColor: "#79DFFF",
        width: '80%',
        alignSelf: 'center',
    },
    scrollView: {
        marginHorizontal: 20, 
        width: '85%', 
        height: 300, 
        marginTop: 20
    },
    submitButton: {
        width: '90%', 
        alignSelf: "center",
        backgroundColor: 'black',
        borderRadius: 30,
        marginTop: '15%',
        marginBottom: '50%',
    },
    snackbar: {
        marginBottom: 50
    },
});
const restaurantData = [
    {
        name: 'Cuisine 1',
        image: 'https://www.tastingtable.com/img/gallery/20-japanese-dishes-you-need-to-try-at-least-once/l-intro-1644007893.jpg',
    },
    {
        name: 'Cuisine 2',
        image: 'https://www.tastingtable.com/img/gallery/20-japanese-dishes-you-need-to-try-at-least-once/l-intro-1644007893.jpg',
    },
    {
        name: 'Cuisine 3',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Cuisine 4',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Cuisine 5',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Cuisine 6',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
]
const usersData = [
    {
        name: 'Human 1',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeOnJCKlUe6hNqbiQ6VBkguq03nT5MmewRiw&usqp=CAU',
    },
    {
        name: 'Human 2',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeOnJCKlUe6hNqbiQ6VBkguq03nT5MmewRiw&usqp=CAU',
    },
    {
        name: 'Human 3',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeOnJCKlUe6hNqbiQ6VBkguq03nT5MmewRiw&usqp=CAU',
    },
    {
        name: 'Human 4',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeOnJCKlUe6hNqbiQ6VBkguq03nT5MmewRiw&usqp=CAU',
    },
    {
        name: 'Human 5',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeOnJCKlUe6hNqbiQ6VBkguq03nT5MmewRiw&usqp=CAU',
    },
    {
        name: 'Human 6',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeOnJCKlUe6hNqbiQ6VBkguq03nT5MmewRiw&usqp=CAU',
    },
]