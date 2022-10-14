import React from 'react'
import { StyleSheet,Text } from 'react-native'
import { theme } from '../../../../assets/theme/theme'


export default function Header(props) {
    return <Text style={styles.header} {...props} />
  }
  
const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: theme.colors.primary_1,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
})