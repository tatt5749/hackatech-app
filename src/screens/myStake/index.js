import React, { useContext,useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalContext } from "../../contexts/Provider";

import MyStakeComponent from "../../components/Mystake";
import { tabHeader } from "../../helpers/CommonFunction";
import i18n,{t} from "../../services";
import { WALLET_STAKE } from "../../constants/RouteNames";
import stakeLists from "../../contexts/actions/Wallet/StakeLists";
import init from "../../contexts/actions/Init";
import { INIT_STAKE_LISTS,INIT_STAKE_CLAIM } from "../../constants/ActionTypes/Wallet";
import { objectLength } from "../../helpers/CommonFunction";
import walletOverview from "../../contexts/actions/Wallet/WalletOverview";
import stakeOverview from "../../contexts/actions/Wallet/StakeOverview";
import ApproveClaimScreen from "../ApproveClaim";
import UnstakeScreen from "../unstake";
import claim from "../../contexts/actions/Wallet/Claim";
import checkClaimStatus from "../../contexts/actions/Wallet/CheckClaimStatus";
import { countCheck,waitingSecond } from "../../configs/config";

const MyStakeScreen = ({navigation }) => {
    useEffect(() => {
        setOptions(tabHeader(t("wallet:my_holdings")));
        initStackeLists();
        stackLists(start);
    }, []);

    const COUNT_CHECK = countCheck; 
    const WAITING_SECOND = waitingSecond; 
    const [claimTransactionHash, setClaimTransactionHash] =  useState(null);
    const [claimPermissionDialog , setClaimPermissionDialog] = useState(false);
    const [claimDialog , setClaimDialog] = useState(false);
    const [claimCount , setClaimCount] = useState(0);
    const [unstakeDialog , setUnstakeDialog] = useState(false);
    const [unstakeId , setUnstakeId] = useState(-1);
    const [unstakeAmt , setUnstakeAmt] = useState(0);
    const [offset, setOffset] = useState(5);
    const [start,setStart] =useState(0);
    const [isListEnd, setIsListEnd] = useState(false);
    const [approveClaimFlag,setApproveClaimFlag] = useState(false);

    const {
        walletDispatch,
        walletState:{
            wallet:{walletData,walletLoading},
            stakeLists : {stakeListsData,stakeListsError,stakeListsLoading,stakeListsIsSuccess,stakeListsTotalRecords},
            stakeOverview : {stakeOverviewData,stakeOverviewError,stakeOverviewLoading,stakeOverviewIsSuccess},
            claim : {claimData,claimLoading,claimIsSuccess,claimError},
            claimStatus : {claimStatusSuccess,claimStatusLoading},
        },
    } = useContext(GlobalContext);

    const {navigate, setOptions} = useNavigation();


    
    useEffect(() => {
        let approveClaimFlag = ( stakeOverviewData?.userDetails?.approve_claim == 0) ? true : false ;
        setApproveClaimFlag(approveClaimFlag);
    }, [stakeOverviewData]);

    useEffect(() => {
        if(!claimStatusLoading && !claimIsSuccess && claimCount <=  COUNT_CHECK){
            setClaimCount(claimCount + 1);
            setTimeout(function () {
                checkClaimStatusAction(claimTransactionHash);
            }, WAITING_SECOND);
        }
    }, [claimStatusLoading]);

    useEffect(() => {
        if(approveClaimFlag){
            setClaimPermissionDialog(true);
        }
    },[claimPermissionDialog]);
   
    useEffect(() => {
        if(unstakeId >= 0){  
            setUnstakeDialog(true);
        }
    },[unstakeDialog]);

    const onClickStake = () => {
        navigate(WALLET_STAKE,{});
    }

    const onClickUnstake = (unstakeId,unstackAmount) => {  
        setUnstakeDialog(!unstakeDialog);
        setUnstakeId(unstakeId);
        setUnstakeAmt(unstackAmount);
    }

    const onClickClaim = () => { 
        if(approveClaimFlag){
            setClaimPermissionDialog(!claimPermissionDialog);
        }else{
            setClaimDialog(true);
        }
    }


    const onCloseClaimDialog = () => { 
        setClaimDialog(false);
        
    }

    const claimAction = () => {
        //console.log("CLCIK CLAIM");
        claim()(walletDispatch)((item) => {
            setClaimTransactionHash(item.data.result);
            setTimeout(function () {
                checkClaimStatusAction(item.data.result);
            }, WAITING_SECOND);
        })
    }

    const stackLists = (startNum) => {
        
        stakeLists(startNum,offset)(walletDispatch);
    }

    const initStackeLists = () => { 
        init(INIT_STAKE_LISTS)(walletDispatch);
        init(INIT_STAKE_CLAIM)(walletDispatch);
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

    const onRefresh = () => {
        initStackeLists();
        let startNum = 0;
        setStart(startNum);
        stackLists(startNum);
    };

    const checkClaimStatusAction =  (id) => {
        checkClaimStatus(id)(walletDispatch)((item) => {
            setClaimDialog(false);
            walletOverview()(walletDispatch);
            stakeOverview()(walletDispatch);
        })
    }


    //console.log(start,objectLength(stakeListsData));
    //console.log(stakeOverviewData);
    //console.log("-> "+unstakeDialog);
    return (
        <>
            <MyStakeComponent 
                walletData={walletData}
                stakeOverviewData={stakeOverviewData}
                onClickStake={onClickStake}
                claimDialog={claimDialog}
                claimAction={claimAction}
                onCloseClaimDialog={onCloseClaimDialog}
                claimLoading={claimLoading}
                onClickClaim={() => {
                    onClickClaim()
                }}
                onClickUnstake={onClickUnstake}
                transactionsList={stakeListsData}
                transactionsListLoading={stakeListsLoading}
                onEndReached={onEndReached}
                onRefresh={onRefresh}
            />
            <ApproveClaimScreen openFlag={claimPermissionDialog}/>
            <UnstakeScreen visisble={unstakeDialog} unstake_id={unstakeId} start={start} offset={offset} unstackAmount={unstakeAmt}/>
        </> 
        
    )
}

export default MyStakeScreen;