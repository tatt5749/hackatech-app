import React from 'react'
import { SafeAreaView ,StyleSheet} from 'react-native'


export default function Background({ 
  children,
  bgColor
}) {
    return (
      <SafeAreaView 
        style={[
          styles.background,
          bgColor ? {backgroundColor:bgColor} : {},
        ]}
      >
        {children}
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
  })