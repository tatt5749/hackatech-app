import { WALLET_RECEIVE,WALLET_SEND,WALLET_STAKE,WALLET_UNSTAKE,WALLET_STAKING } from "../RouteNames";

export const ACTION_RECEIVE = "receive";
export const ACTION_SEND = "send";
export const ACTION_STAKING = "staking";
// export const ACTION_STAKE = "stake";
// export const ACTION_UNSTAKE = "unstake";



export const ACTION_LISTS = [
    {
        "index" : ACTION_RECEIVE,
        "key" : ACTION_RECEIVE,
        "icon" : "qrcode",
        "iconType" : "materialCommunity",
        "screen" : WALLET_RECEIVE
    },
    {
        "index" : ACTION_SEND,
        "key" : ACTION_SEND,
        "icon" : "send",
        "iconType" : "materialCommunity",
        "screen" : WALLET_SEND
    },
    {
        "index" : ACTION_STAKING,
        "key" : ACTION_STAKING,
        "icon" : "coins",
        "iconType" : "fa5",
        "screen" : WALLET_STAKING
    },
    // {
    //     "index" : ACTION_UNSTAKE,
    //     "key" : ACTION_UNSTAKE,
    //     "icon" : "cash",
    //     "iconType" : "materialCommunity",
    //     "screen" : WALLET_UNSTAKE
    // }
]
