import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Share } from "react-native";
import { Appbar, Button, Card, Snackbar } from "react-native-paper";
import { getFirestore, collection, query, onSnapshot, orderBy, deleteDoc, doc, setDoc } from "firebase/firestore";
import { SocialModel } from "../../../../models/social.js";
import { styles } from "./FeedScreen.styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../MainStackScreen.js";
import { getAuth, signOut } from "firebase/auth";

/* 
  Remember the navigation-related props from Project 2? They were called `route` and `navigation`,
  and they were passed into our screen components by React Navigation automatically.  We accessed parameters 
  passed to screens through `route.params` , and navigated to screens using `navigation.navigate(...)` and 
  `navigation.goBack()`. In this project, we explicitly define the types of these props at the top of 
  each screen component.

  Now, whenever we type `navigation.`, our code editor will know exactly what we can do with that object, 
  and it'll suggest `.goBack()` as an option. It'll also tell us when we're trying to do something 
  that isn't supported by React Navigation!
*/
interface Props {
  navigation: StackNavigationProp<MainStackParamList, "FeedScreen">;
}

export default function FeedScreen({ navigation }: Props) {

  // state variables
  const [socials, setSocials] = useState<SocialModel[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = useState("");

  // snackbar toggles
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // poke snackbar using message
  useEffect(() => {
    if (message !== "") {
      onToggleSnackBar();
    }
  }, [message]);

  // user setup and get social collection
  const auth = getAuth();
  const currentUserId = auth.currentUser!.uid;
  const db = getFirestore();
  const socialsCollection = collection(db, "socials");

  // set up a listener for the socials collection
  useEffect(() => {
    const unsubscribe = onSnapshot(query(socialsCollection, orderBy("eventDate", "asc")), (querySnapshot) => {
      var newSocials: SocialModel[] = [];
        querySnapshot.forEach((social: any) => {
          const newSocial = social.data() as SocialModel;
          newSocial.id = social.id;
          newSocials.push(newSocial);
        });
        setSocials(newSocials);
      });
    return unsubscribe;
  }, []);

  // share a social
  const onShare = async (social: SocialModel) => {
    try {
      const result = await Share.share({
        message: 'Hey, hope to see you at '+social.eventName+'at ' + social.eventLocation+'!',
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // update a given social's likes in firestore
  const updateSocialLikes = async (social: SocialModel) => {
    await setDoc(doc(db, "socials", social.id!), {
      id: social.id,
      eventDate: social.eventDate,
      eventDescription: social.eventDescription,
      eventImage: social.eventImage,
      eventLocation: social.eventLocation,
      eventName: social.eventName,
      likes: social.likes,
      creator: social.creator,
    });
  }

  // determine if the user needs to be included or excluded from the social's likes
  const toggleInterested = (social: SocialModel) => {
    var newLikes = social.likes;
    newLikes = newLikes.includes(currentUserId) ? 
    newLikes.filter((s) => s !== currentUserId) : newLikes.concat(currentUserId);
    social.likes = newLikes;
    updateSocialLikes(social);
  };

  // delete a social from the firestore
  const deleteSocial = async (social: SocialModel) => {
    // TODO: Put your logic for deleting a social here,
    // and call this method from your "delete" button
    // on each Social card that was created by this user.
    // const document = doc(db, socials, social.id)
    if (auth.currentUser!.uid === social.creator) {
      await deleteDoc(doc(db, "socials", social.id));
    } else {
      console.log("User is not the social creator and cannot delete");
      console.error("You can only delete your own socials!");
    }
  };

  // render a social
  const renderSocial = ({ item }: { item: SocialModel }) => {
    const onPress = () => {
      navigation.navigate("DetailScreen", {
        social: item,
      });
    };

    return (
      <Card onPress={onPress} style={{ margin: 16 }}>

        <Card.Cover source={{ uri: item.eventImage }} />

        <Card.Title
          title={item.eventName}
          subtitle={
            item.eventLocation +
            " • " +
            new Date(item.eventDate).toLocaleString() + 
            " • " +
            item.likes.length + 
            (item.likes.length === 1 ? " like" : " likes")
          }
        />

        {/* TODO: Add a like/interested button & delete social button. See Card.Actions
              in React Native Paper for UI/UX inspiration.
              https://callstack.github.io/react-native-paper/card-actions.html */}

        <Card.Actions>  

          <Button icon={ item.likes.includes(currentUserId) ? 'heart' : 'heart-outline' } onPress={() => toggleInterested(item)}>
            Like{ item.likes.includes(currentUserId) ? 'd' : '' }
          </Button>

          <Button 
            color="red" 
            onPress={() => { deleteSocial(item) } } 
            style={{ position: 'absolute', marginLeft: 100 }}
            icon='trash-can-outline'>
            Delete
          </Button>

          <Button 
            onPress={()=> onShare(item)}
            icon={'export-variant'}
            style={{ position: 'absolute', marginLeft: 220 }}>
              Share
          </Button>

        </Card.Actions>
        
      </Card>
    );
  };

  // appbar with sign out button and new social button
  const Bar = () => {
    return (
      <Appbar.Header>

        <Appbar.Action
          icon="exit-to-app"
          onPress={() => signOut(auth)}
        />

        <Appbar.Content title="Socials" />

        <Appbar.Action
          icon="plus"
          onPress={() => {
            navigation.navigate("NewSocialScreen");
          }}
        />

      </Appbar.Header>
    );
  };

  // list empty component 
  const ListEmptyComponent = (() => {
    return (
      <Text style={ styles.emptyText }>Welcome! To get started, use the plus button in the top-right corner to create a new social.</Text>
    );
  });

  return (
    <>
      <Bar />
      <View style={styles.container}>
        <FlatList
          data={socials}
          renderItem={renderSocial}
          keyExtractor={(_: any, index: number) => "key-" + index}
          // TODO: Uncomment the following line, and figure out how it works
          // by reading the documentation :)
          // https://reactnative.dev/docs/flatlist#listemptycomponent

          ListEmptyComponent={ ListEmptyComponent }
        />
      </View>
      
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={ styles.snackbar }
        >
        {message}
      </Snackbar>
    </>
  );
}
