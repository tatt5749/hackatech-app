import React from 'react';
import { View,StyleSheet, ActivityIndicator } from 'react-native';

const RenderFooter = ({loading,style}) => { 
    return (
        <View style={[styles.wrapper, style]}>
            {loading ? (
                <ActivityIndicator
                    color="black"
                    style={{margin: 15}} />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper : {
    }
})

export default RenderFooter;