import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./Icon";
import { sizes, spacing } from "../constant/theme";

const MainHeader = ({title}:{title: string}) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, {marginTop: insets.top+5}]}>
            <Icon icon="bars" onPress={() => {}}/>
            <Text style={styles.title}>{title}</Text>
            <Icon icon="bell-o" onPress={() => {}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.l
    },
    title: {
        fontSize: sizes.h3,
        fontWeight: 'bold',
    }
})

export default MainHeader;