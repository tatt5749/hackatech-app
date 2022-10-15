import React, { useContext,useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { withNavigation } from "react-navigation";
import { TransitionPresets } from 'react-navigation-stack';
import * as WebBrowser from 'expo-web-browser';
import { GlobalContext } from "../../contexts/Provider";
import Icon from "../../components/Common/Icon";
import WalletComponent from "../../components/Wallet";
import { TRANSACTION,BOTTOM_TAB_BAR,CREATE_WALLET_LANDING } from "../../constants/RouteNames";
import { INIT_CREATE_WALLET,INIT_GET_WALLET,INIT_STAKE_LISTS } from "../../constants/ActionTypes/Wallet";
import { Fonts,Colors,Sizes } from "../../constants/Themes";
import { objectLength,isNull } from "../../helpers/CommonFunction";
import createWallet from "../../contexts/actions/Wallet/CreateWallet";
import init from "../../contexts/actions/Init";
import keepLogin from "../../contexts/actions/Auth/KeepLogin";
import SuccessMessageModal from "../../components/Common/SuccessMessageModal";
import Loading from "../../components/Common/Loading";
import i18n,{t} from "../../services";
import walletOverview from "../../contexts/actions/Wallet/WalletOverview";
import LoadingComponent from "../../components/Common/LoadingComponent";
import stakeLists from "../../contexts/actions/Wallet/StakeLists";

const WalletScreen = ({navigation }) => {
    const {navigate, setOptions} = useNavigation();
    const [offset, setOffset] = useState(5);
    const [start,setStart] =useState(0);
    const [isListEnd, setIsListEnd] = useState(false);

    const {
        authDispatch,
        walletDispatch,
        walletState:{
            wallet:{walletData,walletLoading},
            createWallet: {createWalletData, createWalletError,createWalletLoading,createWalletIsSuccess},
            stakeLists : {stakeListsData,stakeListsError,stakeListsLoading,stakeListsIsSuccess,stakeListsTotalRecords},
        },
        authState: {
            userInfo: {userData}
        },
    }  = useContext(GlobalContext);

    const [walletAddress,setWalletAddress] = useState(userData?.user_info?.wallet_address)

    useEffect(() => {
        initWallet();
        initStackeLists();
        walletOverview()(walletDispatch);
        stackLists(start);
    }, []);

    useEffect(() => {
        setWalletAddress(userData?.user_info?.wallet_address)
    }, [userData?.user_info?.wallet_address]);

   
    const stackLists = (startNum) => {
        stakeLists(startNum,offset)(walletDispatch);
    }

    const onEndReached=()=>{  
        if (!stakeListsLoading && !isListEnd) {
            let startNum = objectLength(stakeListsData)
            setStart(startNum);
            stackLists(startNum);
        }

        if(objectLength(stakeListsData) >= stakeListsTotalRecords ){
            setIsListEnd(true);
        }
    }




    const initWallet = () => {
        init(INIT_CREATE_WALLET)(walletDispatch);
    }

    const initStackeLists = () => { 
        init(INIT_STAKE_LISTS)(walletDispatch);
    }

    const onclickSeeAllTransaction = () => { console.log("sccs");
        WebBrowser.openBrowserAsync("https://testnet.bscscan.com/address/"+walletAddress);
    }

    const onclickSeeContract = () => { console.log("sccs");
        WebBrowser.openBrowserAsync("https://testnet.bscscan.com/address/0x12E95AfaE2FB674c769e5E1b089cdD39d97ff262");
    }

    const onClickWalletAction = (screen) =>{
        if(isNull(walletAddress) ){
            navigate(CREATE_WALLET_LANDING);
        }else{
            navigate(screen);
        }
    }
    
    const onClickCreateWalletAction = () =>{
        createWallet()(walletDispatch)((item) => {
            keepLogin(item.data)(authDispatch);
        })
    }

    const onClickNextCreateWalletAction = () =>{
        init(INIT_CREATE_WALLET)(walletDispatch);
    }

    const onRefresh = () => {
        initWallet();
        initStackeLists();
        walletOverview()(walletDispatch);
        stackLists(start);
    };
    
    //console.log(stakeListsData);

    return(
        <>
            {
                <WalletComponent 
                    walletData={walletData}
                    walletLoading={walletLoading}
                    onRefresh={onRefresh}
                    transactionLists={stakeListsData}
                    transactionListsLoading={stakeListsLoading}
                    onClickWalletAction={onClickWalletAction}
                    onclickSeeAllTransaction={onclickSeeAllTransaction}
                    walletAddress={walletAddress}
                    onClickCreateWalletAction={onClickCreateWalletAction}
                    onClickNextCreateWalletAction={onClickNextCreateWalletAction}
                    createWalletLoading={createWalletLoading}
                    createWalletIsSuccess={createWalletIsSuccess}
                    onclickSeeContract={onclickSeeContract}
                />
            }
        </>
            
    )
}


export default WalletScreen;