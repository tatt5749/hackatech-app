import React, { useContext,useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { withNavigation } from "react-navigation";
import { TransitionPresets } from 'react-navigation-stack';
import { GlobalContext } from "../../contexts/Provider";
import { tabHeader } from "../../helpers/CommonFunction";
import i18n,{t} from "../../services";
import CreateWalletLandingComponent from "../../components/CreateWalletLanding";
import createWallet from "../../contexts/actions/Wallet/CreateWallet";
import keepLogin from "../../contexts/actions/Auth/KeepLogin";
import init from "../../contexts/actions/Init";
import { INIT_CREATE_WALLET } from "../../constants/ActionTypes/Wallet";

const CreateWalletLandingScreen = ({navigation }) => {
    const {navigate, setOptions} = useNavigation();

    const {
        walletDispatch,
        authDispatch,
        walletState:{
            createWallet: {createWalletData, createWalletError,createWalletLoading,createWalletIsSuccess},
        },
        accountState: {
          userProfile: {userProfileLoading, userProfileError,userProfileData},
          editUserProfile:{editUserProfileLoading, editUserProfileError,editUserProfileData,editUserProfileIsSuccess}
        },
       
    } = useContext(GlobalContext);

    useEffect(() => {
        setOptions(tabHeader(t("wallet:create_wallet")));
    }, []);

    const onClick = () => {
        createWallet()(walletDispatch)((item) => {
            keepLogin(item.data)(authDispatch);
            
        })
    }
    //console.log(createWalletIsSuccess);
    const onNextClick = () => { 
        init(INIT_CREATE_WALLET)(walletDispatch);
        navigation.goBack();
    }
   
    return (
        <CreateWalletLandingComponent 
            onClick={onClick}
            loading={createWalletLoading}
            isSuccess={createWalletIsSuccess}
            onNextClick={onNextClick}
        />
    )
}

export default CreateWalletLandingScreen;