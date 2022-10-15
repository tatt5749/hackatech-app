import React, { useContext,useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalContext } from "../../contexts/Provider";
import { WALLET_STAKE,MY_STAKE } from "../../constants/RouteNames";
import StakingComponent from "../../components/Staking";
import { tabHeader } from "../../helpers/CommonFunction";
import i18n,{t} from "../../services";
import AgreeStakingComponent from "../../components/Staking/AgreeStaking";
import approveStake from "../../contexts/actions/Wallet/ApproveStake";
import stakeOverview from "../../contexts/actions/Wallet/StakeOverview";
import checkApproveStakeStatus from "../../contexts/actions/Wallet/CheckApproveStakeStatus";
import LoadingComponent from "../../components/Common/LoadingComponent";
import { toFixed } from "../../helpers/CommonFunction";
import { TouchableOpacity,Text } from "react-native";
import * as WebBrowser from 'expo-web-browser';

const StakingScreen = ({navigation}) => {
    const COUNT_CHECK = 10; 
    const WAITING_SECOND = 10000; 
    const {navigate, setOptions} = useNavigation();
    const [approveStakeFlag,setApproveStakeFlag] = useState(false);
    const [loading,setLoading]  = useState(false);
 
    const {
        walletDispatch,
        walletState:{
            wallet:{walletData,walletLoading},
            approveStake: {approveStakeData, approveStakeError,approveStakeLoading,approveStakeIsSuccess},
            stakeOverview : {stakeOverviewData,stakeOverviewError,stakeOverviewLoading,stakeOverviewIsSuccess},
            //approveStakeStatus : {approveStakeStatusData,approveStakeStatusError,approveStakeStatusLoading,approveStakeStatusIsSuccess},
        },
    } = useContext(GlobalContext);

    useEffect(() => {
        setOptions(
            tabHeader(t("wallet:staking")),
        );
        stakeOverview()(walletDispatch);
    }, []);

   

    useEffect(() => {
        if(stakeOverviewData?.userDetails){
            let approveStakeFlag = ( stakeOverviewData?.userDetails.approve_stake == 0) ? true : false ;
            setApproveStakeFlag(approveStakeFlag)
        }
    }, [stakeOverviewData]);

  
    //console.log(stakeOverviewData);

    const onClickStack = () => {
        navigate(WALLET_STAKE,{
            "apr_rate" :  stakeOverviewData?.interest_rate_percentage,
            "balance" :  walletData?.fixed_token_balance,
        });
    }

    const onAgreeClick = () => {
        approveStake()(walletDispatch)((item) => {
            setTimeout(function () {
                checkApproveStackStatus();
            }, WAITING_SECOND);
        })
    }

    const checkApproveStackStatus = (count=0) => { 
        checkApproveStakeStatus()(walletDispatch)((item) => { 
            if(item.data.approve_stake == 1){
                setApproveStakeFlag(false);
            }else{
                if(count <  COUNT_CHECK){
                    setTimeout(function () {
                        checkApproveStackStatus(count + 1);
                    }, WAITING_SECOND);
                }else{
                    setApproveStakeFlag(false);
                    navigation.goBack();
                }
            }
           
        })
    }

    const onclickSeeContract = () => { console.log("sccs");
        WebBrowser.openBrowserAsync("https://testnet.bscscan.com/address/0xd11E4e2fc55E7a3205871437160EC42C580f028d");
    }

    const onRejectClick = () => {
        setApproveStakeFlag(false);
        navigation.goBack();
    }
    
    const onClickStakeContract = () => {
        navigate(MY_STAKE,{});
    }

    return (
        <>
        {
            stakeOverviewLoading 
            ? 
                <LoadingComponent />
            :

                approveStakeFlag 
                ?
                    <AgreeStakingComponent 
                        visible={approveStakeFlag} 
                        onAgreeClick={onAgreeClick} 
                        onRejectClick={onRejectClick}
                        loading={approveStakeLoading}
                    />
                :
                    <StakingComponent 
                        onClickStack={onClickStack}
                        onClickStakeContract={onClickStakeContract}
                        data={stakeOverviewData}
                        walletData={walletData}
                        onclickSeeContract={onclickSeeContract}
                    />
        }
        </>
        
    )
}

export default StakingScreen;