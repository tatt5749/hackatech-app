import React, { useContext,useEffect, useState } from "react";
import {View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalContext } from "../../contexts/Provider";

import i18n,{t} from "../../services";
import { Colors,Sizes,Fonts } from "../../constants/Themes";
import approveClaim from "../../contexts/actions/Wallet/ApproveClaim";
import checkApproveClaimStatus from "../../contexts/actions/Wallet/CheckApproveClaimStatus";
import ConfirmationDialog from "../../components/Common/ConfirmationDialog";
import { countCheck,waitingSecond } from "../../configs/config";
import stakeOverview from "../../contexts/actions/Wallet/StakeOverview";


const ApproveClaimScreen = ({
    navigation,
    openFlag=false
}) => { 
    const {
        walletDispatch,
        walletState:{
            approveClaim: {approveClaimData, approveClaimError,approveClaimLoading,approveClaimIsSuccess},
            stakeOverview : {stakeOverviewData,stakeOverviewError,stakeOverviewLoading,stakeOverviewIsSuccess},
        },
    } = useContext(GlobalContext);

    const COUNT_CHECK = countCheck; 
    const WAITING_SECOND = waitingSecond; 
    const {navigate, setOptions} = useNavigation();
    const [approveClaimFlag,setApproveClaimFlag] = useState(openFlag);
    //console.log("ApproveClaimScreen --> "+openFlag+"->"+approveClaimFlag)
    useEffect(() => { 
        if(openFlag){
            setApproveClaimFlag(openFlag)
        }
    }, [openFlag]);

    useEffect(() => { 
        if(stakeOverviewData?.userDetails){
            let approveClaimFlag = ( stakeOverviewData?.userDetails.approve_claim == 0) ? true : false ;
            setApproveClaimFlag(approveClaimFlag)
        }
    }, [stakeOverviewData]);

    const onAgreeClick = () => {
        approveClaim()(walletDispatch)((item) => {
            setTimeout(function () {
                onCheckApproveClaimStatus();
            }, WAITING_SECOND);
        })
    }

    const onCheckApproveClaimStatus = (count=0) => { 
        checkApproveClaimStatus()(walletDispatch)((item) => { 
            if(item.data.approve_claim == 1){
                stakeOverview()(walletDispatch);
                setApproveClaimFlag(false);
            }else{
                if(count <  COUNT_CHECK){
                    setTimeout(function () {
                        onCheckApproveClaimStatus(count + 1);
                    }, WAITING_SECOND);
                }else{
                    setApproveClaimFlag(false);
                }
            }
        })
    }

    const onRejectClick = () => {
        setApproveClaimFlag(false);
    }
    
    return (
        <ConfirmationDialog 
            loading={approveClaimLoading}
            visible={approveClaimFlag}
            onCancelClick={onRejectClick}
            onAgreeClick={onAgreeClick}
            buttonConfirmTitle={t("wallet:button_yes_approve")} 
            buttonCanceltitle={t("wallet:button_no_goback")}
            title={t("wallet:agree_claim_info_title")}
        >
            <View>
                <Text style={{ marginVertical: Sizes.fixPadding, textAlign: 'center', ...Fonts.gray13Medium }}>
                    {t("wallet:agree_stacking_info")}
                </Text>
            </View>
        </ConfirmationDialog>
    )

}

export default ApproveClaimScreen;