import React, { useState,useEffect, useRef, useContext } from 'react';
import {useNavigation} from '@react-navigation/native';
import {
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { Fonts, Colors, Sizes  } from '../../constants/Themes';
import i18n,{t} from '../../services';
import Icon from '../Common/Icon';


const AccountComponent = ({
  
}) => {
   

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
            
        </SafeAreaView>
    )
}


export default AccountComponent;