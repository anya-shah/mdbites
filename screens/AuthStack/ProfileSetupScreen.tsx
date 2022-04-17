import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import ButtonBlack from '../../ButtonBlack';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';
import RestaurantCard from '../../RestaurantCard';
import * as ImagePicker from "expo-image-picker";
import { auth } from "../../App";
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Code for ImagePicker (from docs)





const Bar = () => {
    return (
        <Appbar.Header style={{ backgroundColor: "#79DFFF" }}>
            <Appbar.Content title="Socials" />
        </Appbar.Header>
    );
};

export default function ProfileSetupScreen(props) {
    const {navigation} = props;
    const [priceRange, setPriceRange] = useState(0);
    const [nickName, setnickName] = useState("");
    const [distance, setDistance] = useState(0);
    const [eventImage, setEventImage] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [creatingAccount, setCreatingAccount] = useState(false);


    useEffect(() => {
        // if (creatingAccount) {
        //   createUserWithEmailAndPassword(auth, email, password)
        //     .then(() => {
        //       console.log('User account created & signed in!');
        //     })
        //     .catch(error => {
        //       if (error.code === 'auth/email-already-in-use') {
        //         console.log('That email address is already in use!');
        //       }
    
        //       if (error.code === 'auth/invalid-email') {
        //         console.log('That email address is invalid!');
        //         // setMessage("Please use a valid email address.");
        //       }
        //     });
        //   }
        //   setCreatingAccount(false);
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
            <SafeAreaView>
                <Bar />
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={{ fontSize: 20, marginBottom: 30 }}>Let's set up your profile</Text>
                        <ButtonBlack text="① What kind of food do you like" />
                        <View style={{
                            backgroundColor: "white",
                            marginHorizontal: 20, width: 300, height: 300, marginTop: 20, marginBottom: 20
                        }}>

                            <ScrollView >
                                <View style={styles.containerRestaurant}>
                                    {restaurantData.map((restaurant, index) => (
                                        <RestaurantCard key={index} name={restaurant.name} image={restaurant.image} />
                                    ))}
                                </View>
                            </ScrollView>
                        </View>


                        <View style={{ marginBottom: 20 }}>
                            <ButtonBlack text="② What's your usual price range?" />
                            <Slider
                                style={{ width: 300, height: 40 }}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor="#79DFFF"
                                maximumTrackTintColor="#000000"
                                value={priceRange}
                                onValueChange={(value) => setPriceRange(Math.round(value))}
                            />
                            <View >
                                <Text style={{ alignContent: "center" }}>Price: {priceRange}</Text>
                            </View>
                            <Text>$0                                                                   $100</Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <ButtonBlack text="③ How far do you usually go?" />
                            <Slider
                                style={{ width: 300, height: 40 }}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor="#79DFFF"
                                maximumTrackTintColor="#000000"
                                value={setDistance}
                                onValueChange={(value) => setDistance(Math.round(value))}
                            />
                            <View >
                                <Text style={{ alignContent: "center" }}>Distance: {distance}</Text>
                            </View>
                            <Text>0 miles                                                                   100 miles</Text>
                        </View>

                        <View>
                            <ButtonBlack text="④ What do your friends call you?" />
                            <TextInput
                                style={{ width: 300, height: 40, marginBottom: 20, marginTop: 10, marginLeft: 15 }}
                                label="Nickname"
                                value={nickName}
                                onChangeText={nickName => setnickName(nickName)}
                            />
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <ButtonBlack text="⑤ Add profile picture?" />
                            <Button mode="outlined" onPress={pickImage} style={{ marginTop: 20 }}>
                                {eventImage ? "Change Image" : "Pick an Image"}
                            </Button>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <ButtonBlack text="⑥Add your friends" />
                            <View style={{
                                backgroundColor: "white",
                                marginHorizontal: 20, width: 300, height: 300, marginTop: 20, marginBottom: 20
                            }}>

                                <ScrollView >
                                    <View style={styles.containerRestaurant}>
                                        {usersData.map((user, index) => (
                                            <RestaurantCard key={index} name={user.name} image={user.image} />
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>

                        <Button
                            mode="contained"
                            onPress={() => setCreatingAccount(true).then(()=>navigation.navigate("ProfileSetupScreen")) }>
                            style={{ marginTop: 10 }}
                            loading={loading}
                        >
                            Submit
                        </Button>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    containerRestaurant: {
        backgroundColor: "#7CA1B4",
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        borderRadius: 30,
    },
    square: {
        backgroundColor: "#7cb48f",
        width: 100,
        height: 100,
        margin: 25,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
});
const restaurantData = [
    {
        name: 'Restaurant 1',
        image: 'https://www.tastingtable.com/img/gallery/20-japanese-dishes-you-need-to-try-at-least-once/l-intro-1644007893.jpg',
    },
    {
        name: 'Restaurant 2',
        image: 'https://www.tastingtable.com/img/gallery/20-japanese-dishes-you-need-to-try-at-least-once/l-intro-1644007893.jpg',
    },
    {
        name: 'Restaurant 3',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Restaurant 4',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Restaurant 5',
        image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Restaurant 6',
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