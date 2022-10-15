import { 
    GET_WALLET_LOADING,GET_WALLET_SUCCESS,GET_WALLET_FAIL,INIT_GET_WALLET,
    CREATE_WALLET_FAIL,
    CREATE_WALLET_LOADING,
    CREATE_WALLET_SUCCESS,
    INIT_CREATE_WALLET,
    APPROVE_STAKE_FAIL,
    APPROVE_STAKE_LOADING,
    APPROVE_STAKE_SUCCESS,
    INIT_APPROVE_STAKE,
    STAKE_OVERVIEW_FAIL,
    STAKE_OVERVIEW_LOADING,
    STAKE_OVERVIEW_SUCCESS,
    CHECK_APPROVE_STAKE_STATUS_FAIL,CHECK_APPROVE_STAKE_STATUS_LOADING,CHECK_APPROVE_STAKE_STATUS_SUCCESS,
    STAKE_FAIL,STAKE_LOADING,STAKE_SUCCESS,INIT_STAKE,
    STAKE_LISTS_FAIL,STAKE_LISTS_LOADING,STAKE_LISTS_SUCCESS,INIT_STAKE_LISTS,
    STAKE_STATUS_FAIL,STAKE_STATUS_LOADING,STAKE_STATUS_SUCCESS,
    CLAIM_LOADING,CLAIM_FAIL,CLAIM_SUCCESS,INIT_CLAIM,
    CLAIM_STATUS_FAIL,CLAIM_STATUS_LOADING,CLAIM_STATUS_SUCCESS,INIT_CLAIM_STATUS,
    APPROVE_CLAIM_FAIL,APPROVE_CLAIM_LOADING,APPROVE_CLAIM_SUCCESS,INIT_APPROVE_CLAIM,
    CHECK_APPROVE_CLAIM_STATUS_FAIL,CHECK_APPROVE_CLAIM_STATUS_LOADING,CHECK_APPROVE_CLAIM_STATUS_SUCCESS,INIT_CHECK_APPROVE_CLAIM_STATUS,
    UNSTACK_FAIL,UNSTACK_LOADING,UNSTACK_SUCCESS,INIT_UNSTACK,
    UNSTACK_STATUS_FAIL,UNSTACK_STATUS_LOADING,UNSTACK_STATUS_SUCCESS,INIT_UNSTACK_STATUS,
    SEND_FAIL,SEND_LOADING,SEND_SUCCESS,INIT_SEND,
    SEND_STATUS_FAIL,SEND_STATUS_LOADING,SEND_STATUS_SUCCESS,INIT_SEND_STATUS
} from "../../constants/ActionTypes/Wallet";

const wallet = (state, {type, payload}) => { 
    switch (type) {
        case INIT_GET_WALLET:
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    walletLoading: false,
                    walletError: null,
                    walletIsSuccess:false,
                    walletData: {},
                }
            };
        case INIT_STAKE_LISTS:
            return {
                ...state,
                stakeLists: {
                    ...state.stakeLists,
                    stakeListsLoading: true,
                    stakeListsError: null,
                    stakeListsIsSuccess:false,
                    stakeListsData: [],
                    stakeListsTotalRecords:0,
                }
            };
        case INIT_CREATE_WALLET:
            return {
                ...state,
                createWallet: {
                    ...state.createWallet,
                    createWalletLoading: false,
                    createWalletError: null,
                    createWalletIsSuccess:false,
                    createWalletData: {},
                }
            };
        case INIT_CLAIM:
            return {
                ...state,
                claim: {
                    ...state.claim,
                    claimLoading: false,
                    claimError: null,
                    claimIsSuccess:false,
                    claimData: {},
                }
            };
        case INIT_SEND:
            return {
                ...state,
                send: {
                    ...state.send,
                    sendLoading: false,
                    sendError: null,
                    sendIsSuccess:false,
                    sendData: {},
                }
            };
        case INIT_UNSTACK:
            return {
                ...state,
                unstack: {
                    ...state.unstack,
                    unstackLoading: false,
                    unstackError: null,
                    unstackIsSuccess:false,
                    unstackData: {},
                }
            };
        case INIT_APPROVE_STAKE:
            return {
                ...state,
                approveStake: {
                    ...state.approveStake,
                    approveStakeLoading: false,
                    approveStakeError: null,
                    approveStakeIsSuccess:false,
                    approveStakeData: {},
                }
            };
        case INIT_APPROVE_CLAIM:
            return {
                ...state,
                approveClaim: {
                    ...state.approveClaim,
                    approveClaimLoading: false,
                    approveClaimError: null,
                    approveClaimIsSuccess:false,
                    approveClaimData: {},
                }
            };
        case INIT_STAKE:
            return {
                ...state,
                stakeStatus : {
                    ...state.stakeStatus,
                    stakeStatusIsSuccess: false,
                    stakeStatusLoading : true,
                },
                stakeOverview : {
                    ...state.stakeOverview,
                    stakeOverviewIsSuccess : false,
                    stakeOverviewLoading : false,
                },
                wallet:{
                    ...state.wallet,
                    walletLoading: false,
                },
                stake: {
                    ...state.stake,
                    stakeLoading: false,
                    stakeError: null,
                    stakeIsSuccess:false,
                    stakeData: {},
                }
            };
        case CHECK_APPROVE_STAKE_STATUS_LOADING:
            return {
                ...state,
                approveStake: {
                    ...state.approveStake,
                    approveStakeLoading: true,
                }
            };
        case STAKE_STATUS_LOADING:
            return {
                ...state,
                stakeStatus : {
                    ...state.stakeStatus,
                    stakeStatusIsSuccess: false,
                    stakeStatusLoading : true,
                },
                stake: {
                    ...state.stake,
                    stakeLoading: true,
                }
            };
        case STAKE_OVERVIEW_LOADING:
            return {
                ...state,
                stakeOverview: {
                    ...state.stakeOverview,
                    stakeOverviewLoading: true,
                    stakeOverviewError: null,
                    stakeOverviewIsSuccess:false,
                    stakeOverviewData: {},
                }
            };
        case GET_WALLET_LOADING:
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    walletLoading: true,
                    walletError: null,
                    walletIsSuccess:false,
                    walletData: {},
                }
            };
        case STAKE_LISTS_LOADING:
            return {
                ...state,
                stakeLists: {
                    ...state.stakeLists,
                    stakeListsLoading: true,
                    stakeListsError: null,
                    //stakeListsIsSuccess:false,
                    //stakeListsData: [],
                    //stakeListsTotalRecords:0,
                }
            };
        case STAKE_LOADING:
            return {
                ...state,
                stake: {
                    ...state.stake,
                    stakeLoading: true,
                    stakeError: null,
                    stakeIsSuccess:false,
                    stakeData: {},
                }
            };
        case CLAIM_LOADING:
            return {
                ...state,
                claim: {
                    ...state.claim,
                    claimLoading: true,
                    claimError: null,
                    claimIsSuccess:false,
                    claimData: {},
                }
            };
        case CLAIM_STATUS_LOADING:
            return {
                ...state,
                claimStatus : {
                    ...state.claimStatus,
                    claimStatusIsSuccess: false,
                    claimStatusLoading : true,
                },
                claim: {
                    ...state.claim,
                    claimLoading: true,
                }
            };
        case SEND_LOADING:
            return {
                ...state,
                send: {
                    ...state.send,
                    sendLoading: true,
                    sendError: null,
                    sendIsSuccess:false,
                    sendData: {},
                }
            };
        case SEND_STATUS_LOADING:
            return {
                ...state,
                sendStatus : {
                    ...state.sendStatus,
                    sendStatusIsSuccess: false,
                    sendStatusLoading : true,
                },
                send: {
                    ...state.send,
                    sendLoading: true,
                }
            };
        case UNSTACK_LOADING:
            
            return {
                ...state,
                unstack: {
                    ...state.unstack,
                    unstackLoading: true,
                    unstackError: null,
                    unstackIsSuccess:false,
                    unstackData: {},
                }
            };
        case UNSTACK_STATUS_LOADING:
            return {
                ...state,
                unstackStatus : {
                    ...state.unstackStatus,
                    unstackStatusIsSuccess: false,
                    unstackStatusLoading : true,
                },
                unstack: {
                    ...state.unstack,
                    unstackLoading: true,
                }
            };
        case CREATE_WALLET_LOADING:
            return {
                ...state,
                createWallet: {
                    ...state.createWallet,
                    createWalletLoading: true,
                    createWalletError: null,
                    createWalletIsSuccess:false,
                    createWalletData: {},
                }
            };
        case APPROVE_STAKE_LOADING:
            return {
                ...state,
                approveStake: {
                    ...state.approveStake,
                    approveStakeLoading: true,
                    approveStakeError: null,
                    approveStakeIsSuccess:false,
                    approveStakeData: {},
                }
            };
        case APPROVE_CLAIM_LOADING:
            return {
                ...state,
                approveClaim: {
                    ...state.approveClaim,
                    approveClaimLoading: true,
                    approveClaimError: null,
                    approveClaimIsSuccess:false,
                    approveClaimData: {},
                }
            };
        case CHECK_APPROVE_CLAIM_STATUS_LOADING:
            return {
                ...state,
                approveClaim: {
                    ...state.approveClaim,
                    approveClaimLoading: true,
                }
            };
        case STAKE_OVERVIEW_SUCCESS:
            return {
                ...state,
                stakeOverview: {
                    ...state.stakeOverview,
                    stakeOverviewLoading: false,
                    stakeOverviewData: payload.data.contracts[0],
                    stakeOverviewIsSuccess:true,
                    stakeOverviewError: null,
                },
            };
        case CHECK_APPROVE_STAKE_STATUS_SUCCESS:
            return {
                ...state,
                approveStake: {
                    ...state.approveStake,
                    approveStakeLoading: (payload.data.approve_stake == 0) ? true : false,
                }
            };
        case GET_WALLET_SUCCESS:
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    walletLoading: false,
                    walletData: payload.data.contracts[0],
                    walletIsSuccess:true,
                    walletError: null,
                },
            };
        case STAKE_STATUS_SUCCESS:
            return {
                ...state,
                stakeStatus : {
                    ...state.stakeStatus,
                    stakeStatusIsSuccess: (payload?.data?.status == 1) ? true : false,
                    stakeStatusLoading : false,
                },
                stake: {
                    ...state.stake,
                    stakeLoading: false,
                    stakeIsSuccess:true,
                },
            };
        case STAKE_LISTS_SUCCESS:
            return {
                ...state,
                stakeLists: {
                    ...state.stakeLists,
                    stakeListsLoading: false,
                    stakeListsData: [ ...state.stakeLists.stakeListsData, ...payload.data.stakes],
                    stakeListsTotalRecords:payload.data.stake_count,
                    stakeListsIsSuccess:false,
                    stakeListsError: null,
                },
            };
        case STAKE_SUCCESS:
            return {
                ...state,
                stake: {
                    ...state.stake,
                    stakeLoading: true,
                    stakeData: payload.data,
                    stakeIsSuccess:false,
                    stakeError: null,
                },
            };
        case CLAIM_SUCCESS:
            return {
                ...state,
                claim: {
                    ...state.claim,
                    claimLoading: true,
                    claimData: payload.data,
                    claimIsSuccess:false,
                    claimError: null,
                },
            };
        case CLAIM_STATUS_SUCCESS:
            return {
                ...state,
                claimStatus : {
                    ...state.claimStatus,
                    claimStatusIsSuccess: (payload?.data?.status == 1) ? true : false,
                    claimStatusLoading : false,
                },
                claim: {
                    ...state.claim,
                    claimLoading: false,
                    claimIsSuccess:true,
                },
            };
        case SEND_SUCCESS:
            return {
                ...state,
                send: {
                    ...state.send,
                    sendLoading: true,
                    sendData: payload.data,
                    sendIsSuccess:false,
                    sendError: null,
                },
            };
        case SEND_STATUS_SUCCESS:
            return {
                ...state,
                sendStatus : {
                    ...state.sendStatus,
                    sendStatusIsSuccess: (payload?.data?.status == 1) ? true : false,
                    sendStatusLoading : false,
                },
                send: {
                    ...state.send,
                    sendLoading: false,
                    sendIsSuccess:true,
                },
            };
        case UNSTACK_SUCCESS:
            return {
                ...state,
                unstack: {
                    ...state.unstack,
                    unstackLoading: true,
                    unstackData: payload.data,
                    unstackIsSuccess:false,
                    unstackError: null,
                },
            };
        case UNSTACK_STATUS_SUCCESS:
            return {
                ...state,
                unstackStatus : {
                    ...state.unstackStatus,
                    unstackStatusIsSuccess: (payload?.data?.status == 1) ? true : false,
                    unstackStatusLoading : false,
                },
                unstack: {
                    ...state.unstack,
                    unstackLoading: false,
                    unstackIsSuccess:true,
                },
            };
        case CREATE_WALLET_SUCCESS:
            return {
                ...state,
                createWallet: {
                    ...state.createWallet,
                    createWalletLoading: false,
                    createWalletData: payload.data,
                    createWalletIsSuccess:true,
                    createWalletError: null,
                },
            };
        case APPROVE_STAKE_SUCCESS:
            return {
                ...state,
                approveStake: {
                    ...state.approveStake,
                    approveStakeLoading: true,
                    approveStakeData: payload.data,
                    approveStakeIsSuccess:true,
                    approveStakeError: null,
                },
            };
        case APPROVE_CLAIM_SUCCESS:
            return {
                ...state,
                approveClaim: {
                    ...state.approveClaim,
                    approveClaimLoading: true,
                    approveClaimData: payload.data,
                    approveClaimIsSuccess:true,
                    approveClaimError: null,
                },
            };
        case CHECK_APPROVE_CLAIM_STATUS_SUCCESS:
            return {
                ...state,
                approveClaim: {
                    ...state.approveClaim,
                    approveClaimLoading: (payload.data.approve_claim == 0) ? true : false,
                }
            };
        case STAKE_OVERVIEW_FAIL:
            return {
                ...state,
                stakeOverview: {
                    ...state.stakeOverview,
                    stakeOverviewLoading: false,
                    stakeOverviewIsSuccess:false,
                    stakeOverviewData: {},
                    stakeOverviewError: payload,
                },
            };
        case CHECK_APPROVE_STAKE_STATUS_FAIL:
            return {
                ...state,
                approveStakeStatus: {
                    ...state.approveStakeStatus,
                    approveStakeStatusLoading: false,
                    approveStakeStatusIsSuccess:false,
                    approveStakeStatusData: {},
                    approveStakeStatusError: payload,
                },
            };
        case STAKE_STATUS_FAIL:
            return {
                ...state,
                stakeStatus : {
                    ...state.stakeStatus,
                    stakeStatusIsSuccess: false,
                    stakeStatusLoading : false,
                },
                stake: {
                    ...state.stake,
                    stakeLoading: true,
                    stakeIsSuccess:false
                },
            };
        case CREATE_WALLET_FAIL:
            return {
                ...state,
                createWallet: {
                    ...state.createWallet,
                    createWalletLoading: false,
                    createWalletIsSuccess:false,
                    createWalletData: {},
                    createWalletError: payload,
                },
            };
        case APPROVE_STAKE_FAIL:
            return {
                ...state,
                approveStake: {
                    ...state.approveStake,
                    approveStakeLoading: false,
                    approveStakeIsSuccess:false,
                    approveStakeData: {},
                    approveStakeError: payload,
                },
            };
        case APPROVE_CLAIM_FAIL:
            return {
                ...state,
                approveClaim: {
                    ...state.approveClaim,
                    approveClaimLoading: false,
                    approveClaimIsSuccess:false,
                    approveClaimData: {},
                    approveClaimError: payload,
                },
            };
        case CHECK_APPROVE_CLAIM_STATUS_FAIL:
            return {
                ...state,
                approveClaimStatus: {
                    ...state.approveClaimStatus,
                    approveClaimStatusLoading: false,
                    approveClaimStatusIsSuccess:false,
                    approveClaimStatusData: {},
                    approveClaimStatusError: payload,
                },
            };
        case GET_WALLET_FAIL:
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    walletLoading: false,
                    walletIsSuccess:false,
                    walletData: {},
                    walletError: payload,
                },
            };
        case STAKE_FAIL:
            return {
                ...state,
                stake: {
                    ...state.stake,
                    stakeLoading: false,
                    stakeIsSuccess:false,
                    stakeData: {},
                    stakeError: payload,
                },
            };
        case CLAIM_FAIL:
            return {
                ...state,
                claim: {
                    ...state.claim,
                    claimLoading: false,
                    claimIsSuccess:false,
                    claimData: {},
                    claimError: payload,
                },
            };
        case CLAIM_STATUS_FAIL:
            return {
                ...state,
                claimStatus : {
                    ...state.claimStatus,
                    claimStatusIsSuccess: false,
                    claimStatusLoading : false,
                },
                claim: {
                    ...state.claim,
                    claimLoading: true,
                    claimIsSuccess:false
                },
            };
        case SEND_FAIL:
            return {
                ...state,
                send: {
                    ...state.send,
                    sendLoading: false,
                    sendIsSuccess:false,
                    sendData: {},
                    sendError: payload,
                },
            };
        case SEND_STATUS_FAIL:
            return {
                ...state,
                sendStatus : {
                    ...state.claimStatus,
                    sendStatusIsSuccess: false,
                    sendStatusLoading : false,
                },
                send: {
                    ...state.send,
                    sendLoading: true,
                    sendIsSuccess:false
                },
            };
        case UNSTACK_FAIL:
            return {
                ...state,
                unstack: {
                    ...state.unstack,
                    unstackLoading: false,
                    unstackIsSuccess:false,
                    unstackData: {},
                    unstackError: payload,
                },
            };
        case UNSTACK_STATUS_FAIL:
            return {
                ...state,
                unstackStatus : {
                    ...state.unstackStatus,
                    unstackStatusIsSuccess: false,
                    unstackStatusLoading : false,
                },
                unstack: {
                    ...state.unstack,
                    unstackLoading: true,
                    unstackIsSuccess:false
                },
            };
        case STAKE_LISTS_FAIL:
            return {
                ...state,
                stakeLists: {
                    ...state.stakeLists,
                    stakeListsLoading: false,
                    stakeListsIsSuccess:false,
                    stakeListsData: [],
                    stakeListsError: payload,
                    stakeListsTotalRecords:0,
                },
            };
        default:
            return state;
    }
}


export default wallet;