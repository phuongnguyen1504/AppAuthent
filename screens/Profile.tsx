import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { useAuth } from '../context/AuthContext';
import { sizes } from '../constant/theme';

const Profile = () => {
  const {authState, onLogout} = useAuth();
  return (
    <View style={styles.container}>
      <View>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <Text>Profile</Text>
      <TouchableOpacity onPress={onLogout}><Text>Profile</Text></TouchableOpacity>
      </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    height:sizes.height
  },
})
export default Profile