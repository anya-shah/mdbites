import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ScrollView, Image, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { MainStackParamList } from "../MainStackScreen";
import { styles } from "./DetailScreen.styles";

interface Props {
  navigation: StackNavigationProp<MainStackParamList, "DetailScreen">;
  route: RouteProp<MainStackParamList, "DetailScreen">;
}

export default function DetailScreen({ route, navigation }: Props) {
  const { post } = route.params;

  // appbar
  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate("FeedScreen")} />
        <Appbar.Content title="Posts" />
      </Appbar.Header>
    );
  };

  // details for social
  return (
    <>
      <Bar />
      <ScrollView style={styles.container}>
        <View style={styles.view}>
          <Image style={styles.image} source={{ uri: post.image }} />
          <Text style={{ ...styles.h1, marginVertical: 10 }}>
            {post.restaurant}
          </Text>
          <Text style={{ ...styles.subtitle, marginBottom: 5 }}>
            {post.restaurant}
          </Text>
          <Text style={{ ...styles.subtitle, marginTop: 5, marginBottom: 20 }}>
            {new Date(post.date).toLocaleString() + 
            " • " + 
            post.likes.length + 
            (post.likes.length === 1 ? " like" : " likes")}
          </Text>
          <Text style={styles.body}>{post.comment}</Text>
        </View>
      </ScrollView>
    </>
  );
}
