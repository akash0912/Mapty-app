import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapPreview from "../components/MapPreview";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
const PlacesDetailScreen = (props) => {
  const id = props.route.params.placeId;
  const selectedPlace = useSelector((state) =>
    state.place.places.find((place) => place.id === id)
  );
  const coordinate = {
    lat: selectedPlace.lat,
    lng: selectedPlace.lng,
  };

  const maopPressHandler=()=>{
    props.navigation.navigate('Map',{
      readOnly: true,
      initialLocation: coordinate
    })
  }
  return (
    <View style={styles.screen}>
    
    <ScrollView contentContainerStyle={{alignItems:'center'}}>
      <Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{selectedPlace.address}</Text>
      </View>
      <View style={styles.mapPreview}>
      <MapPreview coordinates={coordinate} navigation={props.navigation} onMapPress={maopPressHandler} />
      </View>
      </View>
    </ScrollView>
    </View>
  );
};

export default PlacesDetailScreen;
export const placeDetailOptions = (navData) => {
  const { placeTitle } = navData.route.params;
  return {
    title: placeTitle,
  };
};
const styles = StyleSheet.create({
  screen:{
    flex: 1,
    justifyContent:'center',
  },
  image: {
    height: '30%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 600,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    flex:1
    
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    overflow:'hidden',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});

