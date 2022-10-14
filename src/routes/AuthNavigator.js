import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { LOGIN } from '../constants/RouteNames';
import LoginScreen from '../screens/auths/Login';

const AuthNavigator = () => {
    const AuthStack = createStackNavigator();
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false}} initialRouteName={LOGIN}>
            <AuthStack.Screen name={LOGIN} component={LoginScreen} />
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;