import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View, Image, Animated } from "react-native";
import React, {Component} from "react";

import App from "../../App";
import { AppStyles } from "../../AppStyles";

export const OpeningScreenMain = (props: { navigation: any; }) => {
    const { navigation } = props;

    return (
        <View style={AppStyles.fullScreenBlue}>
            <Image source={require("../../assets/delivery-icon.png")}></Image>
            <TouchableOpacity onPress={() => {navigation.navigate("Auth")}}>
                <View style={AppStyles.openingText}>
                    <Text style={AppStyles.openingMD}>md</Text>
                    <Text style={AppStyles.openingBites}>bites</Text>   
                </View>
            </TouchableOpacity>
        </View>
    );
    }

    