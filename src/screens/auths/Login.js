import React, { Component, useEffect,useContext } from "react";
import {
    BackHandler
} from "react-native";
import { withNavigation } from "react-navigation";
import { useNavigation,useNavigationState } from '@react-navigation/native';
import { GlobalContext } from "../../contexts/Provider";
import LoginComponent from "../../components/Auth/Login";

import { INIT_LOGIN } from "../../constants/ActionTypes/Auth";
import init from "../../contexts/actions/Init";
import loginUser from "../../contexts/actions/Auth/LoginUser";
import { LOGIN_BY_EMAIL,LOGIN_BY_PHONE } from "../../constants/Enums/LoginType";
import alert from "../../components/Common/Alert";
import i18n,{t} from "../../services";

const LoginScreen = () => {
    const {navigate} = useNavigation();
    const {
        authDispatch,
        authState: {
            login:{error, loading}
        },
    } = useContext(GlobalContext);

   
    useEffect(() => {  
        init(INIT_LOGIN)(authDispatch);
    },[])


    useEffect(() => {
        let errMsg = null;
        if(error?.error){
            errMsg = error?.error;
            console.log(errMsg);
            alert( t('app:error'),  errMsg, [
                {
                    text:  t('app:confirm'),
                    onPress: () => {
                        onClearError();
                    },
                },
            ])
       }
    }, [error]); // Only re-run the effect if count changes

    const onClearError = (data) => {
        init(INIT_LOGIN)(authDispatch);
    };

    const emailOnSubmit = (data) => { 
        const formRequest ={
            "email" : data?.email,
            "password" : data.password,
            "token" : null
        }
        loginUser(formRequest,LOGIN_BY_EMAIL)(authDispatch);
    };

    const phoneOnSubmit = (data) => { 
        const formRequest ={
            "phone" : data?.phone_number,
            "password" : data.password,
            "token" : null
        } 
        loginUser(formRequest,LOGIN_BY_PHONE)(authDispatch);
    };

    
    return (
        <LoginComponent 
            loading={loading}
            emailOnSubmit={emailOnSubmit}
            phoneOnSubmit={phoneOnSubmit}
        />
    )
}




export default withNavigation(LoginScreen);
