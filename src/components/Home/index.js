import React, { useState,useEffect, useRef, useContext } from 'react';
import {useNavigation} from '@react-navigation/native';
import ContentLoader from "react-native-easy-content-loader";
import {
    StyleSheet,
    FlatList,
    View,
    RefreshControl,
    SafeAreaView,
    Text,
    Image,
    StatusBar
} from 'react-native';
import { Fonts, Colors, Sizes  } from '../../constants/Themes';
import i18n,{t} from '../../services';
import Icon from '../Common/Icon';
import { toFixed } from '../../helpers/CommonFunction';

const HomeComponent = ({
    
}) => {

    return (
        <SafeAreaView style={{}}>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    userWelcomeContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 2.0,
    },
    balanceAndProfitInfoContainerStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0
    },
    balanceAndProfitPercentageInfoStyle: {
        flexDirection: 'row',
        backgroundColor: "rgba(255,255,255,0.22)",
        alignItems: 'center',
        paddingHorizontal: 12.0,
        paddingVertical: 12.0,
        borderRadius: 22.0
    },
    portfolioContainerStyle: {
        height: 170.0,
        width: 230.0,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginHorizontal: 10.0,
        marginVertical: 15.0,
        paddingHorizontal: 10.0,
        paddingVertical: 10.0,
        borderRadius: 20,
        elevation: 3.0,
    }
});

export default HomeComponent;