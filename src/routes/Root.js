import React, {useEffect, useContext, useState, useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import { GlobalContext } from '../contexts/Provider';
import keepLogin from '../contexts/actions/Auth/KeepLogin';




const Root = () => {
    const {
        authState: {
            login: {isLoggedIn}
        },
        authDispatch,
    }  = useContext(GlobalContext);

    const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
    const [authLoaded, setAuthLoaded] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const getUser = async () => { 
        try {
            const user = await AsyncStorage.getItem('user');
            
            if (user) {
                setAuthLoaded(true);
                setIsAuthenticated(true);
                setUserInfo(JSON.parse(user));
                keepLogin(JSON.parse(user))(authDispatch);
            } else {
                setAuthLoaded(true);
                setIsAuthenticated(false);
            }
        } catch (error) {}
    }
    
    useEffect(() => {
        if(!isLoggedIn){
            getUser();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        //SplashScreen.hide();
    }, []);
    
    return (
        <>
            {authLoaded ? (
                <NavigationContainer >
                    {isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            ) : (
                <></>
            )}
        </>
    )
  
}


export default Root;