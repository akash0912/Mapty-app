import Place from "../../models/place";
import { ADD_PLACES, SET_PLACES } from "../action/places-action";
const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACES:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.lat,
        action.placeData.lng
      );
      return {
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        ),
      };
    default:
      return state;
  }
};
