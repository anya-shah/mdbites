import React from 'react'
import { View, Text } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign"


export default function SearchBar({cityHandler}) {
    return (
        <View style= {{marginTop:15, flexDirection: "row"}}>
            <GooglePlacesAutocomplete
            query = {{key: "AIzaSyC0-DgRonlVfdTBnlQa_sHnRs3ome24gnw"}}
            onPress = {(data, details = null) => {
                console.log(data.description);
                const city = data.description.split(",")[0];
                cityHandler(city);
            }}
                placeholder = "Search"
                styles = {{
                    textInput: {
                        backgroundColor: "#eee",
                        borderRadius:20,
                        fontWeight:"700",
                        marginTop:7,
                    },
                    textInputContainer: {
                        backgroundColor: "#eee",
                        borderRadius: 50,
                        flexDirection:"row",
                        alighItems: "center",
                        marginRight:10,
                    },
                }}
                renderLeftButton = {()=> (
                <View style = {{marginLeft:10, marginTop:15}}>
                    <Ionicons name = "location-sharp" size = {24} />
                </View>
                )}
                renderRightButton = {()=> (
                <View style = {{flexDirection:"row",
                marginRight: 8,
                margin:8,
                backgroundColor:"white",
                padding:9,
                alignItems: "center",
                borderRadius:20,
                
                }}>
                    <AntDesign name = "clockcircle" size = {12} style={{marginRight:6}} />
                    <Text>Search</Text>
                </View>
                )}
            />
        </View>
    );
}
