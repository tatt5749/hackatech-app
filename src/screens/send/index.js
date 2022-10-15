import React, { useContext,useEffect,useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalContext } from "../../contexts/Provider";

import SendComponent from "../../components/Send";
import { tabHeader } from "../../helpers/CommonFunction";
import i18n,{t} from "../../services";
import { INIT_SEND } from "../../constants/ActionTypes/Wallet";
import send from "../../contexts/actions/Wallet/Send";
import walletOverview from "../../contexts/actions/Wallet/WalletOverview";
import checkSendStatus from "../../contexts/actions/Wallet/CheckSendStatus";
import { countCheck,waitingSecond,currencyCode } from "../../configs/config";
import init from "../../contexts/actions/Init";

const SendScreen = ({navigation }) => {
    const {
        walletDispatch,
        walletState:{
            wallet:{walletData,walletLoading},
            send : {sendData,sendError,sendLoading,sendIsSuccess},
            sendStatus : {sendStatusIsSuccess,sendStatusLoading},
        },
        
    }  = useContext(GlobalContext);

    const {navigate, setOptions} = useNavigation();
    const currentBalance = walletData?.fixed_token_balance ?? 0;
    const [minAmount,setMinAmount] = useState(0.1);
    const maxAmount =  walletData?.fixed_token_balance ?? 0;
    const [count,setCount] = useState(0);
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false); 
    const [transactionHash, setTransactionHash] =  useState(null);
    const COUNT_CHECK = countCheck; 
    const WAITING_SECOND = waitingSecond; 

    useEffect(() => {
        init(INIT_SEND)(walletDispatch);
        setOptions(tabHeader(t("wallet:send")));
    }, []);

    useEffect(() => {
        setLoading(sendLoading)
    }, [sendLoading]);

    useEffect(() => {
        setSuccess(sendIsSuccess)
    }, [sendIsSuccess]);

    useEffect(() => {
        if(!sendStatusLoading && !sendIsSuccess && count <=  COUNT_CHECK){
            setCount(count + 1);
            setTimeout(function () {
                checkSendStatusAction(transactionHash);
            }, WAITING_SECOND);
        }
    }, [sendStatusLoading]);


    const onSubmit = (data) =>{
        const formRequest ={
            "to_address" : data?.wallet_address,
            "amount" : parseFloat(data?.send_amount),
        }

       
        send(formRequest)(walletDispatch)((item) => {
            setTransactionHash(item.data.result);
            setTimeout(function () {
                checkSendStatusAction(item.data.result);
            }, WAITING_SECOND);
        })
    }

    const checkSendStatusAction =  (id) => {
        checkSendStatus(id)(walletDispatch)((item) => {
            walletOverview()(walletDispatch);
        })
    }

    const onBack = () => {
        setSuccess(false);
        //console.log("sc");
    }


    return (
        <SendComponent 
            onSubmit={onSubmit}
            currentBalance={currentBalance}
            minAmount={minAmount}
            maxAmount={maxAmount}
            loading={loading}
            onNextClick={onBack}
            isSucess={success}
        />
    )
}

export default SendScreen;