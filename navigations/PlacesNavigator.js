import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesListScreen,{ placeListOptions } from "../screens/PlacesListScreen";
import PlacesDetailScreen,{placeDetailOptions} from "../screens/PlacesDetailScreen"
import NewPlaceScreen,{newPlaceOptions} from "../screens/NewPlaceScreen";
import MapScreen,{mapOptions} from "../screens/MapScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const MyStack = createNativeStackNavigator();

const defaultStyleOption = {
    headerStyle:{
        backgroundColor:Platform.OS === 'android' ? Colors.primary: '',
    },
    headerTintColor:Platform.OS==='android' ? 'white':  Colors.primary,
} 
export const AppNavigator =()=>{
    return(
        <MyStack.Navigator screenOptions={defaultStyleOption}>
            <MyStack.Screen name="PlacesList" component={PlacesListScreen} options={placeListOptions}/>
            <MyStack.Screen name="PlacesDetail" component={PlacesDetailScreen} options={placeDetailOptions}/>
            <MyStack.Screen name="NewPlace" component={NewPlaceScreen} options={newPlaceOptions}/>
            <MyStack.Screen name="Map" component={MapScreen} options={mapOptions}/>
        </MyStack.Navigator>
    )
}