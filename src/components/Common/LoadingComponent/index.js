import React from 'react';
import { StyleSheet,View,Text,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native';

const LoadingComponent = ({}) => {
    return (
        <View style={ {
            flex: 1,
            justifyContent: "center"
          }}
        >
            <ActivityIndicator /> 
        </View>
    )
}

export default LoadingComponent;