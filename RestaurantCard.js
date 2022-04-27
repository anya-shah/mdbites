import { View, Text, Image } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-web';

const RestaurantCard = (props) => {
  return (
    
    <View style ={{backgroundColor:"white", marginBottom:10, marginTop:10, borderRadius:5}}>
        <Image source = {{uri: props.image}} style = {{width: 120, height: 80,borderRadius:5 }}/>
        <Text>{props.name}</Text>
        <Button style ={{color: "#79DFFF"}} onPress ={()=>{}}>SELECT</Button>
    </View>
    
  )
}

export default RestaurantCard