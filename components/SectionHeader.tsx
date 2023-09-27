import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, sizes, spacing } from '../constant/theme'

const SectionHeader = ({title, onPress, buttonTitle = 'Button'} : {title?: string, onPress?: any, buttonTitle?: string}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity><Text style={styles.button}>{buttonTitle}</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.l,
    marginTop: spacing.l,
    marginBottom: 10
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold'
  },
  button: {
    color: "#1e90ff",
    fontSize: sizes.h3
  }
})

export default SectionHeader