import React from "react";
import { View, TouchableOpacity } from "react-native";
import { colors, shadow } from "../constant/theme";
import Icon from "./Icon";

const FavoriteButton = ({active, style}: {active?: string, style?: any}) => {
    return (
        <View style={[{
            backgroundColor: colors.white,
            padding: 4,
            borderRadius: 20,
        }, 
        shadow.light,
        style]}>
            <TouchableOpacity>
                <Icon icon={active ? "heart": "heart-o"} size={20} color={active ? "#0766FF":"#ADAFB0"}/>
            </TouchableOpacity>
            {/* <Icon icon={active ? "heart": "heart-o"} size={20} color={active ? "#0766FF":"#ADAFB0"}/> */}
        </View>
    )
}

export default FavoriteButton;