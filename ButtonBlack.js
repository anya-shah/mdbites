import { View, Text } from 'react-native'

import { Button } from 'react-native-paper';


const ButtonBlack = (props) => {
 
  return (
    <Button style = {{backgroundColor: "black", borderRadius: 15}} onPress = {()=>(console.log("Pressed"))}>
      <Text style = {{color: "white"}}>{props.text}</Text>
    </Button>
    
  )
}

export default ButtonBlack