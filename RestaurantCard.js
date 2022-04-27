import { View, Text, Image } from 'react-native'
import React, {useEffect} from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-web';

const RestaurantCard = (props) => {
  
  return (
    
    <View style ={{backgroundColor:"white", marginBottom:10, marginTop:10, borderRadius:10}}>
        <Image source = {{uri: props.image}} style = {{width: 120, height: 80, borderTopLeftRadius:10, borderTopRightRadius: 10 }}/>
        <Text style={{alignSelf: 'center'}}>{props.name}</Text>
        <Button style ={{color: "#79DFFF"}} onPress ={()=>{}}>
          <Text style={{color: 'black'}}>
            select
          </Text>
        </Button>
    </View>
    
  )
}

export default RestaurantCard