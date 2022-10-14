import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import {useNavigation, useRoute} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors,Sizes } from "../../constants/Themes";
import HomeScreen from "../home";
import AccountScreen from "../account";
import WalletScreen from "../wallet";
import i18n,{t} from "../../services";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { HOME,WALLET,ACCOUNT } from "../../constants/RouteNames";

const Tab = createBottomTabNavigator();
const BottomTabBarScreen = () => {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({ 
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === HOME) {
                        iconName = 'home';
                        size = focused ? 25 : 20;
                    } else if (route.name === WALLET) {
                        iconName = 'wallet';
                        size = focused ? 25 : 20;
                    }else if (route.name === ACCOUNT) {
                        iconName = 'user-circle';
                        size = focused ? 25 : 20;
                    }
                    return (
                        <FontAwesome5
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    )
                },
                headerShown:false,
                tabBarLabelStyle : { fontSize: 14 }
            })}
            activeColor='#f0edf6'
            inactiveColor='#3e2465'
            barStyle={{ backgroundColor: '#694fad' }}
        >
            <Tab.Screen
                name={HOME}
                component={HomeScreen}
                options={{
                    tabBarLabel: t("app:home"),
                    //unmountOnBlur: true
                }}
            />
            <Tab.Screen
                name={WALLET}
                component={WalletScreen}
                options={{
                    tabBarLabel: t("app:wallet"),
                    //unmountOnBlur: true
                }}
            />
            <Tab.Screen
                name={ACCOUNT}
                component={AccountScreen}
                options={{
                    tabBarLabel: t("app:account"),
                    //unmountOnBlur: true
                }}
            />
        </Tab.Navigator>
    )
}



export default withNavigation(BottomTabBarScreen);


const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30.0,
    },
    animatedView: {
        alignSelf: 'center',
        backgroundColor: "black",
        position: "absolute",
        bottom: -80,
        borderRadius: Sizes.fixPadding * 2.0,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
})