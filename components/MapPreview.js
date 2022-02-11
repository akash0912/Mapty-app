import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

const MapPreview = (props) => {
  return (
    <View style={{...styles.mapPreview, ...props.style}}>
      {props.coordinates ? (
        <MapView
          style={styles.map}
          region={{
            latitude: props.coordinates.lat,
            longitude: props.coordinates.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={props.onMapPress}
        >
          <Marker 
            coordinate={{
              latitude: props.coordinates.lat,
              longitude: props.coordinates.lng,
            }}
          ></Marker>
        </MapView>
      ) : (
        props.children
      )}
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  mapPreview:{
    justifyContent: "center",
    alignItems: "center",
  }
});
