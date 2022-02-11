import {
  StyleSheet,
  Button,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const {onLocationPicked} = props;

    const mapPickedLocation = props.route.params
    ? props.route.params.selectedLocation
    : null;
    useEffect(()=>{
      if(mapPickedLocation){
        setPickedLocation(mapPickedLocation)
      }
      onLocationPicked(mapPickedLocation)
    },[mapPickedLocation,onLocationPicked])

    //Permissions requests
  const askForPermission = async () => {
    const permissionStatus = await Location.requestForegroundPermissionsAsync(); 
    if (!permissionStatus.granted) {
        
      Alert.alert(
        "Permissions Denied",
        "Please make sure to check the location permissions",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };


  const getLocationHandler = async () => {
    const hasPermission = await askForPermission();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      })
      setIsFetching(false);
    } catch (err) {
      Alert.alert(
        "An Error Occurred",
        "Could not fetch the location. Please try agian later!",
        [{ text: "Okay" }]
      );
    }
  };

const mapPressHandler=()=>{
  props.navigation.navigate('Map');
}

  return (
    <View style={styles.locationPicker}>
      <View style={styles.locationView}>
          <MapPreview coordinates={pickedLocation} navigation={props.navigation} onMapPress={mapPressHandler}>
        {isFetching ? (
          <ActivityIndicator size={"large"} color={Colors.primary} />
        ) : (
          <Text style={styles.text}>No location choosen yet.</Text>
        )}
        </MapPreview>
      </View>
      <View style={styles.actions}>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
      <Button
        title="Pick on Map"
        color={Colors.primary}
        onPress={()=>{
            props.navigation.navigate("Map")
        }}
      />

      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
    alignItems:'center'
  },
  locationView: {
    marginBottom: 10,
    width: "100%",
    height: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden'
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actions:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-around',
  }
});
