import React, { useContext,useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalContext } from "../../contexts/Provider";

import StakeComponent from "../../components/Stake";
import { tabHeader } from "../../helpers/CommonFunction";
import i18n,{t} from "../../services";
import stake from "../../contexts/actions/Wallet/Stake";
import { INIT_STAKE } from "../../constants/ActionTypes/Wallet";

import init from "../../contexts/actions/Init";
import checkStakeStatus from "../../contexts/actions/Wallet/CheckStakeStatus";
import stakeOverview from "../../contexts/actions/Wallet/StakeOverview";
import walletOverview from "../../contexts/actions/Wallet/WalletOverview";
import { countCheck,waitingSecond } from "../../configs/config";

const StakeScreen = ({navigation }) => {
    const COUNT_CHECK = countCheck; 
    const WAITING_SECOND = waitingSecond; 
    const {navigate, setOptions} = useNavigation();
    const {params} = useRoute();
    const [count,setCount] = useState(0);
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false); 
    const [transactionHash, setTransactionHash] =  useState(null);

    const {
        walletDispatch,
        walletState:{
            stakeOverview : {stakeOverviewData,stakeOverviewError,stakeOverviewLoading,stakeOverviewIsSuccess},
            stake : {stakeData,stakeError,stakeLoading,stakeIsSuccess},
            stakeStatus : {stakeStatusIsSuccess,stakeStatusLoading},
            wallet:{walletData,walletLoading},
        },
    } = useContext(GlobalContext);

    useEffect(() => {
        setOptions(tabHeader(t("wallet:stake")));
        init(INIT_STAKE)(walletDispatch);
    }, []);

    useEffect(() => {
        setLoading(stakeLoading)
    }, [stakeLoading]);

    useEffect(() => {
        setSuccess(stakeIsSuccess)
    }, [stakeIsSuccess]);

    
   

    useEffect(() => {
        if(!stakeStatusLoading && !stakeIsSuccess && count <=  COUNT_CHECK){
            setCount(count + 1);
            setTimeout(function () {
                checkStakeStatusAction(transactionHash);
            }, WAITING_SECOND);
        }
    }, [stakeStatusLoading]);

    const onSubmit = (data) => {
        const formRequest ={
            "amount" : data?.amount,
        }
        stake(formRequest)(walletDispatch)((item) => {
            setTransactionHash(item.data.result);
            setTimeout(function () {
                checkStakeStatusAction(item.data.result);
            }, WAITING_SECOND);
        })
    }

    const checkStakeStatusAction =  (id) => {
        checkStakeStatus(id)(walletDispatch)((item) => {
            walletOverview()(walletDispatch);
            stakeOverview()(walletDispatch);
        })
    }

    

    const onBack = () => {
        navigation.goBack();
    }

    
    
    return (
        <StakeComponent 
            onSubmit={onSubmit}
            rate={stakeOverviewData?.interest_rate_percentage}
            currentBalance={walletData?.fixed_token_balance}
            maxAmount={walletData?.fixed_token_balance}
            minAmount={0.01}
            loading={loading}
            onNextClick={onBack}
            isSucess={success}
        />
    )
}

export default StakeScreen;