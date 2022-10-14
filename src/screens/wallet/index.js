import React, { useContext,useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { withNavigation } from "react-navigation";
import { TransitionPresets } from 'react-navigation-stack';
import { GlobalContext } from "../../contexts/Provider";
import Icon from "../../components/Common/Icon";
import WalletComponent from "../../components/Wallet";

const WalletScreen = ({navigation }) => {
    return(
        <>
            {
                <WalletComponent 
                   
                />
            }

        </>
            
    )
}


export default WalletScreen;