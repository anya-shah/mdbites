import React from 'react';
import {View, Text, TouchableOpacity, Image} from "react-native"
import { Appbar, Divider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from "././FeedScreen/FeedScreen.styles";
const Bar = ({navigation}) => {
    return (
      <Appbar.Header>

        <Appbar.BackAction onPress={() => navigation.navigate("FeedScreen")} />

        <Appbar.Content title="Spin the roulette!!" />


      </Appbar.Header>
    );
  };
function RouletteScreen({navigation}) {
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
                <Text>ROULETTE SCREEN</Text>
            </View>
            <Divider width ={1} />
            <View style = {{backgroundColor: "#E5E5E5"}}>
            <BottomTabs style = {{marginBottom: 20}}/>
            </View>
      
            </SafeAreaProvider>
            
        </>
    );
}

export default RouletteScreen;