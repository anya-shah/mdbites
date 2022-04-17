import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Share } from "react-native";
import { Appbar, Button, Card, Snackbar } from "react-native-paper";
import { getFirestore, collection, query, onSnapshot, orderBy, deleteDoc, doc, setDoc } from "firebase/firestore";
import { PostModel } from "../../../../models/post.js";
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
  const [posts, setPosts] = useState<PostModel[]>([]);
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

  // user setup and get post collection
  const auth = getAuth();
  const currentUserId = auth.currentUser!.uid;
  const db = getFirestore();
  const postsCollection = collection(db, "posts");

  // set up a listener for the posts collection
  useEffect(() => {
    const unsubscribe = onSnapshot(query(postsCollection, orderBy("date", "asc")), (querySnapshot) => {
      var newPosts: PostModel[] = [];
      
      querySnapshot.forEach((post: any) => {
        console.log(posts.length);
        const newPost = post.data() as PostModel;
        newPost.id = post.id;
        newPosts.push(newPost);
      });
        setPosts(newPosts);
      });
    return unsubscribe;
  }, []);

 

  // update a given post's likes in firestore
  const updatePostLikes = async (post: PostModel) => {
    await setDoc(doc(db, "posts", post.id!), {
      id: post.id,
      date: post.date,
      comment: post.comment!,
      restaurant: post.restaurant,
      image: post.image,
      rating: post.rating,
      creator: post.creator,
      likes: post.likes,
    });
  }

  // determine if the user needs to be included or excluded from the post's likes
  const toggleInterested = (post: PostModel) => {
    var newLikes = post.likes;
    newLikes = newLikes.includes(currentUserId) ? 
    newLikes.filter((s) => s !== currentUserId) : newLikes.concat(currentUserId);
    post.likes = newLikes;
    updatePostLikes(post);
  };

  // delete a post from the firestore
  const deletePost = async (post: PostModel) => {
    // TODO: Put your logic for deleting a post here,
    // and call this method from your "delete" button
    // on each Post card that was created by this user.
    // const document = doc(db, posts, posts.id)
    if (auth.currentUser!.uid === post.creator) {
      await deleteDoc(doc(db, "posts", post.id));
    } else {
      console.log("User is not the post creator and cannot delete");
      console.error("You can only delete your own posts!");
    }
  };

  // render a post
  const renderPost = ({ item }: { item: PostModel }) => {
    const onPress = () => {
      navigation.navigate("DetailScreen", {
        post: item,
      });
    };

    return (
      <Card onPress={onPress} style={{ margin: 16 }}>

        <Card.Cover source={{ uri: item.image }} />

        <Card.Title
          title={item.creator}
          // subtitle={
          //   item.eventLocation +
          //   " • " +
          //   new Date(item.eventDate).toLocaleString() + 
          //   " • " +
          //   item.likes.length + 
          //   (item.likes.length === 1 ? " like" : " likes")
          // }
        />

        {/* TODO: Add a like/interested button & delete social button. See Card.Actions
              in React Native Paper for UI/UX inspiration.
              https://callstack.github.io/react-native-paper/card-actions.html */}

        <Card.Actions>  

          {/* <Button icon={ item.likes.includes(currentUserId) ? 'heart' : 'heart-outline' } onPress={() => toggleInterested(item)}>
            Like{ item.likes.includes(currentUserId) ? 'd' : '' }
          </Button> */}

          <Button 
            color="red" 
            // onPress={() => { deleteSocial(item) } } 
            style={{ position: 'absolute', marginLeft: 100 }}
            icon='trash-can-outline'>
            Delete
          </Button>

          <Button 
            // onPress={()=> onShare(item)}
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

        <Appbar.Content title="Posts" />

        <Appbar.Action
          icon="plus"
          onPress={() => {
            navigation.navigate("NewPostScreen");
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
          data={posts}
          renderItem={renderPost}
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
