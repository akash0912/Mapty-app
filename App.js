import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./navigations/PlacesNavigator";
import store from "./store/store";
import { Provider } from "react-redux";
import { init } from "./helper/db";

init().then(()=>{
  console.log("Database initialization successfully.")
}).catch((err)=>{
  console.log("Database initialization failed")
  console.log(err);

});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
