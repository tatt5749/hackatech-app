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
import styles from './styles';
import { Fonts, Colors, Sizes  } from '../../constants/Themes';
import i18n,{t} from '../../services';
import Icon from '../Common/Icon';
import UserLogout from './Logout';

const AccountComponent = ({
    userData,
    logoutClick,
}) => {
    const userInfo = () => {
        return (
            <View style={{ alignItems: 'center', marginVertical: Sizes.fixPadding * 2.0 }}>
                <View>
                    <Image
                        source={require('../../../assets/images/avatar.png')}
                        style={{ height: 110.0, width: 110.0, borderRadius: 55.0 }}
                        resizeMode="contain"
                    />
                    <View style={[
                            styles.imageVerifySignContainerStyle,
                            {backgroundColor : (userData.email_verify == 0) ?  Colors.redColor : Colors.greenColor }
                        ]}
                    >
                        {
                            userData.email_verify == 0 ?
                                <Icon type="materialCommunity" name="close" size={24} color={Colors.whiteColor} />
                            :
                                <Icon type="materialCommunity" name="check" size={24} color={Colors.whiteColor} />
                        }
                        
                    </View>
                </View>
                <Text style={{ ...Fonts.gray15Medium, marginTop: Sizes.fixPadding }}>
                </Text>
                <Text style={{ ...Fonts.black19Bold, marginVertical: Sizes.fixPadding - 5.0 }}>
                    {userData.name}
                </Text>
                <Text style={{ ...Fonts.gray16Medium }}>
                    {userData.email}
                </Text>
            </View>
        )
    }


    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F6' }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, paddingBottom: Sizes.fixPadding * 6.0 }}>
                <ScrollView>
                    {userInfo()}
                    <UserLogout onclick={logoutClick}/>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


export default AccountComponent;