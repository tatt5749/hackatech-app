import React, { useContext } from 'react';
import {Text, TouchableOpacity,View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { GlobalContext } from '../contexts/Provider';
import {createStackNavigator} from '@react-navigation/stack';
import { 
    BOTTOM_TAB_BAR,
    HOME,
    LOGOUT
} from '../constants/RouteNames';
import HomeScreen from '../screens/home';
import BottomTabBarScreen from '../screens/bottomTabBar';
import LogoutScreen from '../screens/logout';


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
           
            {/* <HomeStack.Screen name={WALLET_STAKE} component={Stakecreen} />
            <HomeStack.Screen name={WALLET_UNSTAKE} component={UnstakeScreen} /> */}
            <HomeStack.Screen name={LOGOUT} component={LogoutScreen} />
        </HomeStack.Navigator>
    )
}

export default HomeNavigator;