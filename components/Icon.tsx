import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";

interface IconProps {
    onPress?: any,
    icon? : any,
    size?: number,
    color?: string
    style?: any
}

const Icon = ({onPress, icon, size =30, color, style}: IconProps) => {
    const FontIcon = (
        <FontAwesome name={icon} size={size} color={color} style={style}/>
    );

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress}>{FontIcon}</TouchableOpacity>
        )
    }
    return FontIcon;
}

export default Icon;