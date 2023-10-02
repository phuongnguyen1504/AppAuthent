import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { colors, sizes, spacing } from '../constant/theme';
import Icon from '../components/Icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {SharedElement} from "react-navigation-shared-element"
import { ParamListBase, RouteProp } from '@react-navigation/native';

const TripDetails = ({navigation, route}: {navigation: any , route: any}) => {
    const insets = useSafeAreaInsets();
    const {trip} = route.params;
    // console.log("🚀 ~ file: TripDetails.tsx:12 ~ TripDetails ~ trip:", trip)
    return (
        <View style={styles.container}>
            <View style={[styles.backButton, {marginTop: insets.top}]}>
                <Icon icon="long-arrow-left" style={styles.backIcon} onPress={()=>navigation.goBack()}/>
            </View>
            <View style={[StyleSheet.absoluteFillObject, styles.imageBox]}>
                <Image source={trip.image} style={[StyleSheet.absoluteFillObject, styles.image]}/>
            </View>
        </View>
    )
}

// TripDetails.sharedElements = (route: { params: { trip: any; }; }) => {
//     const {trip} = route.params;
//     return [{
//         id: `trip.${trip.id}.image`
//     }]
// }

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    imageBox: {
        // borderRadius: sizes.radius,
        overflow: 'hidden'
    },
    image: {
        width: sizes.width,
        height: sizes.height,
        resizeMode: 'cover'
    },
    backButton: {
        position: 'absolute',
        left: spacing.l,
        zIndex: 1
    },
    backIcon: {
        color: colors.white,

    }
})
export default TripDetails;