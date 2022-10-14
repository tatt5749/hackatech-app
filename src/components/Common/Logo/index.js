import React from 'react'
import { Image } from 'react-native'
import { Fonts, Colors, Sizes} from '../../../constants/Themes'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function Logo({ 
    children,
}){
    return (
        <Image 
            source={require('../../../../assets/images/auth-icon.png')}
            style={{ 
                alignSelf: 'center', 
                width: 150.0, 
                height: 150.0, 
                marginBottom: Sizes.fixPadding, 
                marginTop: getStatusBarHeight()}}
            resizeMode="contain"
        />
    )
}
