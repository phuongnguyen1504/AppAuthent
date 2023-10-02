import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from './Icon'
import AntDesign from '@expo/vector-icons/build/AntDesign'

const LoginWithGoogle = ({ promptAsync }: any) => {
    return (

        <TouchableOpacity
            style={{
                backgroundColor: "#4285F4",
                width: "90%",
                padding: 10,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 15,
                marginTop: 80,
                marginBottom: 150,
            }}
            onPress={() => promptAsync()}
        >
            <AntDesign name="google" size={30} color="white" />
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 17 }}>
                Sign In with Google
            </Text>
        </TouchableOpacity>
    )
}

export default LoginWithGoogle