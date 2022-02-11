import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = (props) => {
  const initialLocation = props.route.params ? props.route.params.initialLocation : null;
  const readOnly = props.route.params ? props.route.params.readOnly : null;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  let markerCoordinates;
  const { navigation } = props;

  const mapRegion = {
    latitude: selectedLocation?selectedLocation.lat:21.1929222,
    longitude: selectedLocation?selectedLocation.lng:72.7877272,
    latitudeDelta: 0.09422,
    longitudeDelta: 0.08542,
  };

  const onTapHandler = (event) => {
    if(readOnly){
      return;
    }
     setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savedLocationHandler = useCallback(() => {
    if(!selectedLocation){
      Alert.alert("Warning", "Please Select a location on map",[{text:"Okay"}])
      return;
    }
    props.navigation.navigate('NewPlace',{
      selectedLocation: selectedLocation
    });
  }, [selectedLocation]);

  useEffect(() => {
    navigation.setParams({ savedLocation: savedLocationHandler });
  }, [savedLocationHandler,navigation]);

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }
  return (
    <MapView region={mapRegion} style={styles.map} onPress={onTapHandler}>
      {markerCoordinates && (
        <Marker
          title="selected location"
          coordinate={markerCoordinates}
        ></Marker>
      )}
    </MapView>
  );
};

export default MapScreen;
export const mapOptions = (navData) => {
  const readOnly = navData.route.params? navData.route.params.readOnly : null
  if(readOnly){
    return{
      title:'Map'
    }
  }
  return {
    title: "Map",
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => {
          const { savedLocation } = navData.route.params;
          savedLocation();
        }}
      >
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 10,
  },
  headerButtonText: {
    fontSize: 18,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
});
