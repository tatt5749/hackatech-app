import React, { useContext,useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { GlobalContext } from "../../contexts/Provider";
import { Colors } from "../../constants/Themes";
import HomeComponent from "../../components/Home";


const HomeScreen = ({}) => {
    const navigation = useNavigation();

    return(
        <HomeComponent 
            
        />
    )
}

export default HomeScreen;