import React from 'react';
import { View,StyleSheet } from 'react-native';
import colors from '../../../../../assets/theme/colors';

const ItemSeparatorView = ({style, children}) => {
    return(
        <View style={[styles.wrapper, style]}>{children}</View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        height: 0.5, 
        backgroundColor: colors.grey
    }
})

export default ItemSeparatorView;