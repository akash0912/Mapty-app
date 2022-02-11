import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();
  const askForPermission = async () => {
    const status = await ImagePicker.getCameraPermissionsAsync();
    // console.log(status);

    if (status.granted === false) {
      Alert.alert(
        "Permissions Denied",
        "Please make sure to check the permissions",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await askForPermission();
    if (!hasPermission) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    // console.log(result)
    setPickedImage(result.uri);
    props.onImageTaken(result.uri); // passing image to parent screen
    // console.log(pickedImage)
    
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet!</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImgPicker;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginVertical: 20,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12
  },
  image: {
    height: 200,
    width: '100%'
  },
});
