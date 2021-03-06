import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
import React from 'react'

const CustomHeaderButton =(props)=>{
    return(
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23}  color={Platform.OS==='android'?'white': Colors.primary}/>
    )
}

export default CustomHeaderButton;
