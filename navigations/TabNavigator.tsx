import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { FontAwesome } from "@expo/vector-icons";
import Search from "../screens/Search";
import Favorite from "../screens/Favorite";
import Icon from "../components/Icon";
import { Animated, StyleSheet } from "react-native";
import { sizes } from "../constant/theme";

const Tab = createBottomTabNavigator();
//tabs have two props name is name of icons link, screen is screens navigation
const tabs = [
    {
        name: "Home",
        icon: "home",
        screen: Home
    },
    {
        name: "Search",
        icon: "search",
        screen: Search
    },
    {
        name: "Favorite",
        icon: "heart-o",
        screen: Favorite
    },
    {
        name: "Profile",
        icon: "envelope",
        screen: Profile
    },
]

const TabNavigator = () => {
    const offsetAnimation = React.useRef(new Animated.Value(0)).current;
    return (
        <>
            <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
                {tabs.map(({ name, icon, screen }, index) => {
                    return (
                        <Tab.Screen 
                            key={name} 
                            name={name} 
                            component={screen} 
                            options={{ tabBarIcon: ({ focused }) => (<Icon icon={icon} color={focused ? "#0766FF" : "#8D8D8D"} />) }} 
                            listeners={{focus: () => { Animated.spring(offsetAnimation,{toValue: index * (sizes.width / tabs.length),useNativeDriver: true}).start()}}}
                        />
                    )
                })}
            </Tab.Navigator>
            <Animated.View style={[styles.indicator, {transform: [{translateX: offsetAnimation,}]}]} />
        </>
    )
}



const styles = StyleSheet.create({
    indicator: {
        position: 'absolute',
        width: 25,
        height: 2,
        left: sizes.width / 4 / 2 - 11,
        bottom: 5,
        backgroundColor: "#0766FF",
        zIndex: 100
    }
})

export default TabNavigator;