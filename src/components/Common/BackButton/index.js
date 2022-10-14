import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Icon from '../Icon'

export default function BackButton({ goBack }) {
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
          <Icon type="feather" name="arrow-left" size={25} color="black"/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: 15.0,
      top: 10 ,
    },
    
})