import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { getFileObjectAsync } from "../../../Utils";

// See https://github.com/mmazzarolo/react-native-modal-datetime-picker
// Most of the date picker code is directly sourced from the example
import DateTimePickerModal from "react-native-modal-datetime-picker";

// See https://docs.expo.io/versions/latest/sdk/imagepicker/
// Most of the image picker code is directly sourced from the example
import * as ImagePicker from "expo-image-picker";
import { styles } from "./NewPostScreen.styles";

import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getApp } from "firebase/app";
import { PostModel } from "../../../models/post";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackScreen";

import { auth } from "../../../App";

interface Props {
  navigation: StackNavigationProp<RootStackParamList, "NewPostScreen">;
}

export default function NewPostScreen({ navigation }: Props) {
  // Event details.

  const [image, setImage] = useState<string | undefined>(undefined);
  const [comment, setComment] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState<Date>();

  // Date picker.
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [visible, setVisible] = useState(false);
  // Snackbar.
  const [message, setMessage] = useState("");
  // Loading state for submit button
  const [loading, setLoading] = useState(false);

  // Code for ImagePicker (from docs)
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // Code for ImagePicker (from docs)
  const pickImage = async () => {
    console.log("picking image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("done");
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Code for DatePicker (from docs)
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Code for DatePicker (from docs)
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Code for DatePicker (from docs)
  const handleConfirm = (date: Date) => {
    date.setSeconds(0);
    setDate(date);
    hideDatePicker();
  };

  // Code for SnackBar (from docs)
  const onDismissSnackBar = () => setVisible(false);
  const showError = (error: string) => {
    setMessage(error);
    setVisible(true);
  };

  // This method is called AFTER all fields have been validated.
  const saveEvent = async () => {
    if (!restaurant) {
      showError("Please enter a restaurant.");
      return;
    } else if (!date) {
      showError("Please choose an event date.");
      return;
    } else if (!rating) {
      showError("Please enter a rating.");
      return;
    } else if (!comment) {
      showError("Please enter an event description.");
      return;
    } else if (!image) {
      showError("Please choose an event image.");
      return;
    } else {
      setLoading(true);
    }

    try {
      // Firestore wants a File Object, so we first convert the file path
      // saved in eventImage to a file object.
      console.log("getting file object");
      const object: Blob = (await getFileObjectAsync(image)) as Blob;
      // Generate a brand new doc ID by calling .doc() on the posts node.
      const db = getFirestore();
      const postsCollection = collection(db, "posts");
      const postRef = doc(postsCollection);
      console.log("putting file object");
      const storage = getStorage(getApp());
      const storageRef = ref(storage, postRef.id + ".jpg");
      const result = await uploadBytes(storageRef, object);
      console.log("getting download url");
      const downloadURL = await getDownloadURL(result.ref);
      const postDoc: PostModel = {
        date: date.getTime(),
        comment: comment!,
        restaurant: restaurant,
        image: image,
        rating: rating,
        creator: auth.currentUser!.uid,
        likes: [],
      };
      console.log("setting download url");
      await setDoc(postRef, postDoc);
      setLoading(false);
      navigation.goBack();
    } catch (error: any) {
      setLoading(false);
      showError(error.toString());
    }
  };

  const Bar = () => {
    return (
      <Appbar.Header>
        <Appbar.Action onPress={navigation.goBack} icon="close" />
        <Appbar.Content title="new post" />
      </Appbar.Header>
    );
  };

  return (
    <>
      <Bar />
      <View style={{ ...styles.container, padding: 20 }}>
        <TextInput
          label="Restaurant Name"
          value={restaurant}
          onChangeText={(location) => setRestaurant(location)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
          autoComplete={false}
        />
        <TextInput
          label="Rating (1-5)"
          value={rating}
          onChangeText={(rate) => setRating(rate)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
          autoComplete={false}
        />
        <TextInput
          label="Comment"
          value={comment}
          multiline={true}
          onChangeText={(desc) => setComment(desc)}
          style={{ backgroundColor: "white", marginBottom: 10 }}
          autoComplete={false}
        />
        <Button
          mode="outlined"
          onPress={showDatePicker}
          style={{ marginTop: 20 }}
        >
          {date ? date.toLocaleString() : "When did you go?"}
        </Button>

        <Button mode="outlined" onPress={pickImage} style={{ marginTop: 20 }}>
          {image ? "Change Image" : "Pick an Image"}
        </Button>
        <Button
          mode="contained"
          onPress={saveEvent}
          style={{ marginTop: 20 }}
          loading={loading}
        >
          Save Event
        </Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          themeVariant="light"
        />
        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {message}
        </Snackbar>
      </View>
    </>
  );
}
