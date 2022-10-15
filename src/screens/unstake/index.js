import React, { useContext,useEffect,useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalContext } from "../../contexts/Provider";
import { View,Text } from "react-native";
import UnstakeComponent from "../../components/Unstake";
import { tabHeader,toFixed } from "../../helpers/CommonFunction";
import i18n,{t} from "../../services";
import ConfirmationDialog from "../../components/Common/ConfirmationDialog";
import unstake from "../../contexts/actions/Wallet/Unstake";
import stakeOverview from "../../contexts/actions/Wallet/StakeOverview";
import walletOverview from "../../contexts/actions/Wallet/WalletOverview";
import CheckUnstakeStatus from "../../contexts/actions/Wallet/CheckUnstakeStatus";
import stakeLists from "../../contexts/actions/Wallet/StakeLists";
import { Fonts,Colors,Sizes } from "../../constants/Themes";
import { countCheck,waitingSecond,currencyCode } from "../../configs/config";
import SuccessMessageModal from "../../components/Common/SuccessMessageModal";

const UnstakeScreen = ({
    navigation,
    visisble,
    unstake_id,
    unstackAmount=0,
    offset,
    start
}) => {
    const {navigate, setOptions} = useNavigation();
    const [successFlag,setSuccessFlag] = useState(false);
    const [dialogFlag,setDialogFlag] = useState(false);
    const [unstakeId,setUnstakeId] = useState(-1);
    const [unstakeTransactionHash, setUnstakeTransactionHash] =  useState(null);
    const [unstakeCount , setUnstakeCount] = useState(0);
    const COUNT_CHECK = countCheck; 
    const WAITING_SECOND = waitingSecond; 

    const {
        walletDispatch,
        walletState:{
            unstack: {unstackData, unstackError,unstackLoading,unstackIsSuccess},
            unstackStatus : {unstackStatusSuccess,unstackStatusLoading},
            stakeOverview : {stakeOverviewData,stakeOverviewError,stakeOverviewLoading,stakeOverviewIsSuccess},
        },
    } = useContext(GlobalContext);
    
   
    useEffect(() => {
        setDialogFlag(visisble);
    }, [visisble]);

    useEffect(() => {
        setUnstakeId(unstake_id);
    }, [unstake_id]);


    useEffect(() => {
        if(!unstackStatusLoading && !unstackIsSuccess && unstakeCount <=  COUNT_CHECK){
            setUnstakeCount(unstakeCount + 1);
            setTimeout(function () {
                onCheckUnstackStatus(unstakeTransactionHash);
            }, WAITING_SECOND);
        }
    }, [unstackStatusLoading]);

    const onAgreeClick = () => {
        const formRequest ={
            "stake_id" : unstakeId,
        }
        unstake(formRequest)(walletDispatch)((item) => {
            setUnstakeTransactionHash(item.data.result);
            setTimeout(function () {
                onCheckUnstackStatus(item.data.result);
            }, WAITING_SECOND);
        })
    }

    const onCheckUnstackStatus =(hash) => {
        CheckUnstakeStatus(hash)(walletDispatch)((item) => {
            setDialogFlag(false);
            setSuccessFlag(true);
            stakeLists(start,offset,true)(walletDispatch);
            walletOverview()(walletDispatch);
            stakeOverview()(walletDispatch);
        })
    }

    const onRejectClick = () => {
        setDialogFlag(false);
    }

    const unstackSuccessMessage = () => {
        return (
            <View>
                <Text>
                    <Text style={{ ...Fonts.successColor13Medium }}>
                        {toFixed(unstackAmount)} {currencyCode}
                    </Text>
                    <Text style={{ ...Fonts.black13Medium }}>
                        {t("wallet:unstake_success_text")}
                    </Text>
                </Text>
            </View>
        )
    }


   
   

    return (
        <>
            <ConfirmationDialog 
                loading={unstackLoading}
                visible={dialogFlag}
                onCancelClick={onRejectClick}
                onAgreeClick={onAgreeClick}
                buttonConfirmTitle={t("wallet:button_confirm_unstake")} 
                buttonCanceltitle={t("wallet:button_keep_staking")}
                title={t("wallet:confirm_unstake")}
            >
                <View>
                    <Text style={{ marginVertical: Sizes.fixPadding, textAlign: 'center', ...Fonts.gray13Medium }}>
                        {t("wallet:unstake_info")}
                    </Text>
                </View>
            </ConfirmationDialog>
            <SuccessMessageModal visible={successFlag} onClick={() => { setSuccessFlag(false)}} message={unstackSuccessMessage()}/>
        </>
    )
}

export default UnstakeScreen;