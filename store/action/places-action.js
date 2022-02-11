import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helper/db";

export const ADD_PLACES = "ADD_PLACES";
export const SET_PLACES = "SET_PLACES";

export const addPlaces = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.lat}&longitude=${location.lng}&localityLanguage=en`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();
    console.log(resData);
    if (!resData) {
      throw new Error("Something went wrong");
    }

    const address = resData.locality;
    console.log(address);

    const imageName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + imageName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      //   console.log(dbResult)
      dispatch({
        type: ADD_PLACES,
        placeData: { id: dbResult.insertId, title: title, image: newPath, address: address, lat: location.lat, lng: location.lng },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbPlaces = await fetchPlaces();
      //  console.log(dbPlaces)
      dispatch({ type: SET_PLACES, places: dbPlaces.rows._array });
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
};
