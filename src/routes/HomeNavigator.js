import React, { useContext } from 'react';
import {Text, TouchableOpacity,View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { GlobalContext } from '../contexts/Provider';
import {createStackNavigator} from '@react-navigation/stack';
import { 
    BOTTOM_TAB_BAR,
    HOME,
    ACCOUNT,
    LOGOUT,
    WALLET,
    WALLET_RECEIVE,
    WALLET_SEND,
    WALLET_STAKE,
    WALLET_STAKING,
    CREATE_WALLET_LANDING,
    MY_STAKE
} from '../constants/RouteNames';

import HomeScreen from '../screens/home';
import BottomTabBarScreen from '../screens/bottomTabBar';
import LogoutScreen from '../screens/logout';
import WalletScreen from '../screens/wallet';
import SendScreen from '../screens/send';
import ReceiveScreen from '../screens/receive';
import Stakecreen from '../screens/stake';
import CreateWalletLandingScreen from '../screens/CreateWalletLanding';
import StakingScreen from '../screens/staking';
import MyStakeScreen from '../screens/myStake';

const HomeNavigator = () => {
    const HomeStack = createStackNavigator();
    const {
        authState: {
            userInfo: {userData}
        },
    }  = useContext(GlobalContext);

    const initRouteName = () =>{ 
        
        if(userData.email_verify == 0){ 
            return BOTTOM_TAB_BAR;
            //return VERIFY_EMAIL;
        }else{
            return BOTTOM_TAB_BAR;
        }

    }
    
    return (
        <HomeStack.Navigator 
            initialRouteName={initRouteName()}
            screenOptions={({ navigation, route }) => ({
                 headerStyle: {
                     backgroundColor: '#fff',
                 },
                // headerTintColor: '#fff',
                // headerTitleStyle: {
                //     fontWeight: 'bold',
                // },
               headerTransparent:true 
            })}
            
        >
            <HomeStack.Screen 
                name={BOTTOM_TAB_BAR} 
                component={BottomTabBarScreen} 
                options={{
                    title: '',
                }} 
            />
            <HomeStack.Screen name={HOME} component={HomeScreen} />
            
            <HomeStack.Screen name={WALLET} component={WalletScreen} />
            <HomeStack.Screen name={WALLET_RECEIVE} component={ReceiveScreen} />
            <HomeStack.Screen name={WALLET_SEND} component={SendScreen} />
            <HomeStack.Screen name={WALLET_STAKING} component={StakingScreen} />
            <HomeStack.Screen name={WALLET_STAKE} component={Stakecreen} />
            <HomeStack.Screen name={MY_STAKE} component={MyStakeScreen} />
            <HomeStack.Screen name={CREATE_WALLET_LANDING} component={CreateWalletLandingScreen} />
            <HomeStack.Screen name={LOGOUT} component={LogoutScreen} />
        </HomeStack.Navigator>
    )
}

export default HomeNavigator;