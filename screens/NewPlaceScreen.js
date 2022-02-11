import { StyleSheet, Text, View, ScrollView, Button,TextInput } from "react-native";
import React,{ useCallback, useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placeActions from '../store/action/places-action'
import ImagePicker from '../components/ImagePicker'
import LocationPicker from "../components/LocationPicker";
const NewPlaceScreen = (props) => {
    const dispatch = useDispatch()
    const [title, setTitle ] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [selectedLocation, setSelectedLocation] = useState();

    
    const titleChangeHandler = (text)=>{
        setTitle(text);
    };

    const savePlaceHandler = ()=>{
        dispatch(placeActions.addPlaces(title, selectedImage, selectedLocation));
        props.navigation.goBack();
    }

    //recieving the image from child
    const selectedImageHandler=(uri)=>{
      setSelectedImage(uri);
    }

    const locationPickedHandler =useCallback((location)=>{
      // console.log(location);
      setSelectedLocation(location);
    },[setSelectedLocation])

  return (
    <ScrollView keyboardShouldPersistTaps='always'>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={title}/>
        <ImagePicker onImageTaken={selectedImageHandler}/>
        <LocationPicker {...props} onLocationPicked ={locationPickedHandler}/>
        <Button color={Colors.primary} title="Save Place" onPress={savePlaceHandler}/>
      </View>
    </ScrollView>
  );
};

export default NewPlaceScreen;
export const newPlaceOptions = {
  title: "New Place",
};
const styles = StyleSheet.create({
    form:{
        margin: 30
    },
    label:{
        fontSize: 18,
        marginBottom: 10
    },
    textInput:{
        borderBottomColor:'#888',
        borderBottomWidth: 2,
        marginBottom: 10,
        paddingVertical: 4,
        paddingHorizontal: 3
    }


});
