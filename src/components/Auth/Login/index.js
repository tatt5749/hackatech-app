import React, { Component, useState } from "react";
import {
    Text,
    SafeAreaView,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    BackHandler
} from "react-native";
import { withNavigation } from "react-navigation";
import IntlPhoneInput from 'react-native-intl-phone-input';
import { SwipeListView } from 'react-native-swipe-list-view';

import { REGISTER } from "../../../constants/RouteNames";
import { Fonts, Colors, Sizes } from "../../../constants/Themes";
import Background from "../../Common/Background";
import Container from "../../Common/Container";
import LoginTabBarScreen from "./LoginTabBarScreen";
import i18n,{t} from "../../../services";
import Logo from "../../Common/Logo";
import Loading from "../../Common/Loading";
const LoginComponent = ({
    loading,
    emailOnSubmit,
    phoneOnSubmit,
    onCreateAccountClick,
    onForgotPasswordClick
}) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <Background
            bgColor={Colors.backColor}
        >
          
            <StatusBar backgroundColor={Colors.primaryColor} />
            
            <View style={{ flex: 1, justifyContent: 'center', }}>
                <Logo />
                {signInText()}
                <LoginTabBarScreen 
                    loading={loading}
                    emailOnSubmit={emailOnSubmit}  
                    phoneOnSubmit={phoneOnSubmit} 
                    onCreateAccountClick={onCreateAccountClick}
                    onForgotPasswordClick={onForgotPasswordClick}
                />
                
            </View>
            
        </Background>
    )

    function signInText() {
        return (
            <Text style={{ ...Fonts.gray16Bold, alignSelf: 'center', marginVertical: Sizes.fixPadding + 5.0 }}>
                {t("app:sign_in")}
            </Text>
        )
    }
}


export default LoginComponent;