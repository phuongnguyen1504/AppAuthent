import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./Icon";
import { sizes, spacing } from "../constant/theme";
import { useAuth } from "../context/AuthContext";

const MainHeader = ({title}:{title: string}) => {
    const {authState, onLogout} = useAuth();
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, {marginTop: insets.top+5}]}>
            <Icon icon="bars" onPress={() => {}}/>
            <Text style={styles.title}>{title}</Text>
            <Icon icon="bell-o" onPress={onLogout}/>
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