import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/action/places-action";
import Colors from "../constants/Colors";
const PlacesListScreen = (props) => {
  const placeData = useSelector((state) => state.place.places);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(placesActions.loadPlaces());
    setIsLoading(false);
  }, [dispatch]);

  const renderPlaces = (itemData) => {
    // console.log(placeData);
    return (
      <PlaceItem
        image={itemData.item.imageUri}
        title={itemData.item.title}
        address={itemData.item.address}
        onSelect={() => {
          props.navigation.navigate("PlacesDetail", {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id,
          });
        }}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <FlatList
      data={placeData}
      renderItem={renderPlaces}
      keyExtractor={(item) => item.id}
    />
  );
};

export default PlacesListScreen;
export const placeListOptions = (navData) => {
  return {
    title: "All Places",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Places"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({});
