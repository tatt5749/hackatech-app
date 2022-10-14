import React, { useContext, useEffect, useRef, useState } from 'react';
import { RefreshControl, SafeAreaView, View, StatusBar, Image, StyleSheet, Text,TouchableOpacity,FlatList,Dimensions,Pressable  } from "react-native";
import ContentLoader from "react-native-easy-content-loader";

import { Colors,Fonts,Sizes } from '../../constants/Themes';
import i18n,{t} from '../../services';

const WalletComponent = ({
  
}) => {
    return (
        <SafeAreaView style={{}}>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    createWalletContainerStyle: {
        
        backgroundColor: '#DBE1FF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        marginTop:Sizes.fixPadding
    },
    walletIconContainerStyle: {
        height: 55.0,
        width: 55.0, 
        borderRadius: 27.5,
        backgroundColor: 'rgba(75,106,255,0.25)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    walletInfoWrapStyle: {
        backgroundColor: Colors.primaryColor,
        justifyContent: 'space-between',
        height: 170.0,
        borderRadius: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        padding: Sizes.fixPadding + 5.0,
        
    },
    setWalletActionInfoContentStyle : {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0,
        //marginBottom: Sizes.fixPadding
    },
    setLimitAndLockCardContentStyle: {
        flex: 0.43,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        height: 40.0,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding + 3.0,
        flexDirection: 'row'
    },
    
    titleWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: Sizes.fixPadding * 2.0,
        //marginTop:Sizes.fixPadding + 10.0,
        //marginBottom:Sizes.fixPadding + 10.0,
    },
})

export default WalletComponent;