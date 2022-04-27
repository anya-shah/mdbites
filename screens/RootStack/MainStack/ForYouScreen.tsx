import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native"
import { Appbar, Divider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from "././FeedScreen/FeedScreen.styles";
import Categories from './Categories';
import RestaurantItem, { localRestaurants } from './RestaurantItem';
import SearchBar from './SearchBar';
const YELP_API_KEY = "XLy86Fj-0L96pnL1OFsEY6uMRwzQ1nL9giBwIjIHRibydPdJliRSvOhWm1f72lMfJKY-ZHyzqZStZe4XEKvK7PAVOz0aBID2KNhpblxWAUodttnZU7JI799GBKhZYnYx";

const Bar = ({navigation}) => {
    return (
      <Appbar.Header>

        <Appbar.BackAction onPress={() => navigation.navigate("FeedScreen")} />

        <Appbar.Content title="For You Page" />


      </Appbar.Header>
    );
  };

function ForYouScreen({navigation}) {

    const[restaurantData, setRestaurantData] = useState(localRestaurants);
    const[city, setCity] = useState("San Francisco");
    const [activeTab, setActiveTab] = useState("Delivery")
    const getRestaurantsFromYelp = () => {
    const yelpurl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    
    const apiOptions = {
        headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,  
        },
    };
        return fetch(yelpurl, apiOptions).then((res) => res.json()).then((json) => setRestaurantData(json.businesses.filter((business)=>business.transactions.includes(activeTab.toLowerCase()))));
    };

    useEffect(() => {
        getRestaurantsFromYelp();
    }, [city, activeTab])


    const BottomTabs = () =>  {
    return (
        <View style = {{flexDirection:"row", margin:10, marginHorizontal:30, justifyContent:"space-between", backgroundColor: "#E5E5E5"}}>
            <TouchableOpacity onPress={() => navigation.navigate("ForYouScreen")}>
                <Image source = {require("../../../assets/house.png")} style = {{width:70, height:70}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("FeedScreen")}>
                <Image source = {require("../../../assets/friends.png")} style = {{width:90, height:90}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("RouletteScreen") }>
                <Image source = {require("../../../assets/spin.png")} style = {{width:70, height:70}}/>
            </TouchableOpacity>
        </View>
    )
}
    return (
        <>
            <Bar navigation = {navigation}/>
            <SafeAreaProvider>
            <View style={styles.container}>
                <View style = {{backgroundColor: "white", padding: 15}}>
                    <SearchBar cityHandler = {setCity} />
                </View>
                <ScrollView showsHorizontalScrollIndicator = {false}>
                <Categories/>
                <RestaurantItem navigation = {navigation} restaurantData = {restaurantData} />
                </ScrollView>
            </View>
            <Divider width ={1} />
            <View style = {{backgroundColor: "#E5E5E5"}}>
            <BottomTabs style = {{marginBottom: 20}}/>
            </View>
      
            </SafeAreaProvider>
            
        </>
    );
}

export default ForYouScreen;