import React, { useContext,useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import { GlobalContext } from "../../contexts/Provider";
import { Colors } from "../../constants/Themes";
import HomeComponent from "../../components/Home";
import overview from "../../contexts/actions/Home/Overview";
import init from "../../contexts/actions/Init";
import { INIT_OVERVIEW } from "../../constants/ActionTypes/Home";


const HomeScreen = ({}) => {
    const navigation = useNavigation();

    const {
        homeDispatch,
        authState: {
            userInfo: {userData}
        },
        homeState: {
            overview: {overviewData,overviewLoading,overviewError}
        },
    }  = useContext(GlobalContext);

    useEffect(() => { 
        init(INIT_OVERVIEW)(homeDispatch);
        overview()(homeDispatch);
    },[]);

    const onRefresh = () => {
        init(INIT_OVERVIEW)(homeDispatch);
        overview()(homeDispatch);
    };
    
    const onclickSeeContract = () => { 
        WebBrowser.openBrowserAsync("https://testnet.bscscan.com/address/0x12E95AfaE2FB674c769e5E1b089cdD39d97ff262");
    }


    return(
        <HomeComponent 
            overviewData={overviewData}
            loading={overviewLoading}
            userData={userData}
            onRefresh={onRefresh}
            onclickSeeContract={onclickSeeContract}
        />
    )
}

export default HomeScreen;