import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Fonts, Colors, Sizes } from '../../../constants/Themes'
import { objectLength } from '../../../helpers/CommonFunction'

const CustomButton = ({
    onPress,
    text,
    textStyle={},
    type="PRIMARY",
    bgColor,
    fgColor,
    textColor,
    style,
    disabled=false
}) => { 
    
    const getBgColor = () => { 
        if (disabled) {
            return Colors.greyColor;
        }
    }   
    
    return (
        <Pressable 
            onPress={onPress} 
            disabled={disabled}
            style={[
                styles.container,
                styles['container_${type}'],
                //disabled ? {backgroundColor: getBgColor()} : {},
                bgColor ? {backgroundColor:bgColor} : {},
                style
            ]}
        >
            <Text 
                style={[ 
                    objectLength(textStyle) > 0  ? textStyle :{ ...Fonts.white16SemiBold } ,
                    fgColor ? {backgroundColor:fgColor} : {},
                    textColor ? {color: textColor} : {},
                ]}
            > {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0
    },
    container_PRIMARY : {
        backgroundColor :Colors.primaryColor,
    },
    text : {
        fontWeight: 'bold',
        color: 'white'
    },
});

export default CustomButton