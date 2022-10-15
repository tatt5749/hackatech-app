import React, { useContext,useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

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
    console.log(overviewData)
    return(
        <HomeComponent 
            overviewData={overviewData}
            loading={overviewLoading}
            userData={userData}
            onRefresh={onRefresh}
        />
    )
}

export default HomeScreen;