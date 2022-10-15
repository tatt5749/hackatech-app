import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, SafeAreaView, View, TouchableHighlight, Pressable, StyleSheet, Text,TouchableOpacity,FlatList,RefreshControl  } from "react-native";
import { useForm,Controller } from 'react-hook-form';
import { SwipeListView } from 'react-native-swipe-list-view';
import Dialog from "react-native-dialog";

import Background from '../Common/Background';
import { Colors,Sizes,Fonts } from '../../constants/Themes';
import i18n,{t} from '../../services';
import { toFixed } from '../../helpers/CommonFunction';
import { currencyCode } from '../../configs/config';
import Icon from '../Common/Icon';
import CustomButton from '../Common/CustomButton/CustomButton';
import RenderFooter from '../Common/FlatList/RenderFooter';
import ConfirmationDialog from '../Common/ConfirmationDialog';
const rowSwipeAnimatedValues = {};
Array(500)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });


const MyStakeComponent = ({
    walletData,
    stakeOverviewData,
    onClickClaim,
    onClickUnstake,
    claimDialog,
    claimAction,
    onCloseClaimDialog,
    claimLoading,
    onClickStake,
    transactionsList,
    transactionsListLoading=false,
    onEndReached,
    onRefresh
}) =>{
    const [refreshing, setRefreshing] = React.useState(false);
    const redeemedAmount = stakeOverviewData?.userDetails?.total_redeemable_amount ?? 0;
    //const [redeemedAmount] = useState(0);

    const portfolioInfo = () => {
        return (
            <View style={{ elevation: 5.0, backgroundColor: 'gray' }}>
                <View style={styles.recentValueOfCurrencyContainerStyle}>
                    <View>
                        <Text style={{ ...Fonts.gray13Medium }}>
                            {t("wallet:total_staking")}
                        </Text>
                        <Text style={{ ...Fonts.black17Medium, marginTop: Sizes.fixPadding - 8.0 }}>
                            {toFixed(stakeOverviewData?.userDetails?.staked)}
                        </Text>
                    </View>
                    <View style={{ height: 30.0, width: 0.50, backgroundColor: 'gray' }}>
                </View>
                <View>
                    <Text style={{ ...Fonts.gray13Medium }}>
                        {t("wallet:total_redeem")}
                    </Text>
                    <Text style={{ ...Fonts.black17Medium, marginTop: Sizes.fixPadding - 8.0 }}>
                        {toFixed(redeemedAmount)}
                    </Text>
                </View>
                </View>
            </View>
        )
    }
    

    const transactions = () => {
        const [listData, setListData] = useState(transactionsList);
        const onSwipeValueChange = swipeData => { 
            const { key, value } = swipeData;
            rowSwipeAnimatedValues[key].setValue(Math.abs(value));
        };
        const renderItem = data => (
            <TouchableHighlight
                style={{ ...styles.rowFront, }}
                activeOpacity={0.9}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                        marginVertical: Sizes.fixPadding,
                    }}
                    onPress={() =>  console.log("TOUCH 2") }
                >
                    <View style={styles.depositsContentStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>{t("wallet:stake_amount") } </Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {toFixed(data.item.initial_staked_amount)} 
                                </Text>
                            </View>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>{t("wallet:interest_amount") }</Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {toFixed(data.item.interest_amount)}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>{t("wallet:buyback_amount") } </Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {toFixed(data.item.buyback_amount)}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>{t("wallet:redeemed_amount")}</Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {toFixed(data.item.redeemed_amount)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: (data.item.status == 'Staking')  ? '#FFAA33' : '#006400',
                        ...styles.depositsStatusContentStyle,
                    }}>
                        <Text style={{ ...Fonts.white14Medium, marginLeft: Sizes.fixPadding }}>
                            {data.item.staked_date}
                        </Text>
                    </View>
                </TouchableOpacity>
            </TouchableHighlight>
    
        );

        
        const renderHiddenItem = (data, rowMap) => (
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={styles.backDeleteContinerStyle}
                    onPress={() => onClickUnstake(parseInt(data.item.key),parseFloat(data.item.initial_staked_amount)) }
                >
                    <Animated.View
                        style={[
                            {
                                transform: [
                                    {
                                        scale: rowSwipeAnimatedValues[
                                            data.item.key
                                        ].interpolate({
                                            inputRange: [45, 90],
                                            outputRange: [0, 1],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Icon type="materialCommunity" name="gift" size={29} color="white" style={{ alignSelf: 'center' }}  />
                        <Text style={{ ...Fonts.white13Medium, alignSelf: 'center' }}>{t("wallet:unstake")}</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        );

        return (
            <View style={styles.transactionContainer}>
                <SwipeListView
                    useFlatList={true}
                    data={transactionsList}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-100}
                    onSwipeValueChange={onSwipeValueChange}
                    ListFooterComponent={<RenderFooter loading={transactionsListLoading}/>}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing}
                            onRefresh={onRefresh}>
                        </RefreshControl>
                    }
                />
            </View>
        )
    }

    const stakeAndClaimButton2 = () => {
        let claimDisable =  ( parseFloat(redeemedAmount) > 0 ) ? false : true ;
       
        return (
            <View>
                <View style={{  
                    flexDirection:"row",
                    justifyContent: 'space-between'
                }}>
                    <Pressable
                        onPress={() => onClickStake()}
                        style={[
                            styles.stakingButtonContainerStyle,
                            {backgroundColor: Colors.primaryColor}
                        ]}
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            {t("wallet:stake")}
                        </Text>
                    </Pressable>
                    {/* <View style={styles.stakingButtonLineContainerStyle}>
                        <View style={{ height: 30.0, width: 2.0, backgroundColor: "rgba(255,255,255,0.22)" }}></View>
                    </View> */}
                    <Pressable
                        disabled={claimDisable}
                        onPress={onClickClaim}
                        style={[
                            styles.stakingButtonContainerStyle,
                            {backgroundColor: claimDisable ?  Colors.disabledColor : Colors.primaryColor},
                            {borderLeftWidth:1 ,  borderColor: "rgba(255,255,255,0.22)" }
                            
                        ]}
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            {t("wallet:claim")}
                        </Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    return(
        <Background bgColor={Colors.backColor}>
            <View style={{ flex: 1 }}>
                <View style={{ elevation: 3.0, borderBottomColor: 'gray' }}>
                    {portfolioInfo()}
                </View>
                {transactions()}
            </View>
            {stakeAndClaimButton2()}
            <ConfirmationDialog 
                visible={claimDialog} 
                title={t("wallet:confirm_claim")} 
                onAgreeClick={() => { claimAction() }}
                onCancelClick={() => { onCloseClaimDialog() }}
                loading={claimLoading}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.gray14Medium }}>
                        {t("wallet:amount")}
                    </Text>
                    <Text style={{ ...Fonts.black14Bold }}>
                        {toFixed(redeemedAmount) }
                    </Text>
                </View>
            </ConfirmationDialog>
        </Background>
    )
}
const styles = StyleSheet.create({
    
    stakingButtonContainerStyle: {
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: 40,
        //borderRadius: Sizes.fixPadding
    },
    
    buttonContainerStyle: {
        backgroundColor: Colors.primaryColor, 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //position: 'absolute',
        bottom: 0.0,
        left: 0,
        right: 0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    recentValueOfCurrencyContainerStyle: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding * 2.0,
    },
    noWatchListDataContainerStyle: {
        width: 100.0,
        height: 100.0,
        borderRadius: 75.0,
        backgroundColor: '#DFE0E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    transactionContainer: {
        backgroundColor: Colors.backColor,
        flex: 1,
        marginVertical: Sizes.fixPadding
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 10,
        justifyContent: 'center',
        position: 'absolute',
        top: 10,
        width: 100,
        backgroundColor: 'red',
        right: 0,
    },
    depositsContentStyle: {
        backgroundColor: Colors.whiteColor,
        justifyContent: 'space-between',
        height: 110.0,
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
    },
    rowFront: {
        backgroundColor: Colors.backColor,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1.0,
    },
    depositsStatusContentStyle: {
        flexDirection: 'row',
        paddingVertical: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default MyStakeComponent;