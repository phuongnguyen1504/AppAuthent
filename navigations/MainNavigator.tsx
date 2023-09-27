import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../context/AuthContext";

import Login from "../screens/Login";
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import TabNavigator from "./TabNavigator";
import { StatusBar } from "expo-status-bar";
import TripDetails from "../screens/TripDetails";
import {createSharedElementStackNavigator} from 'react-navigation-shared-element'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();
const Stack = createSharedElementStackNavigator();

const MainNavigator = () => {
    const {authState, onLogout} = useAuth();
  return (
    <NavigationContainer>
        <StatusBar hidden/>
        <Stack.Navigator screenOptions={{headerShown: true}}>
            {authState?.authenticated ? (
            //   <Stack.Screen name='home' component={TabNavigator} options={{title:'Facebook', headerRight: () => <Button title='Sign Out' onPress={onLogout}/>}}></Stack.Screen>
              <>
                <Stack.Screen name='home' component={TabNavigator} options={{headerShown: false, headerRight: () => <Button title='Sign Out' onPress={onLogout}/>}}></Stack.Screen>
                <Stack.Screen name="TripDetails" 
                  component={TripDetails} 
                  options={{
                    headerShown: false, 
                    useNativeDriver: true, 
                    cardStyleInterpolator: ({current: {progress}}) => ({
                      cardStyle: {
                        opacity: progress,
                      }
                    })
                  }}
                />
              </>
            ): (
            <Stack.Screen name='Login' component={Login}></Stack.Screen>
            )}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator;