import React, { useContext, useEffect, useRef,useState } from 'react';
import { Animated, SafeAreaView, View, TouchableHighlight, Image, StyleSheet, Text,TouchableOpacity,Pressable,Dimensions  } from "react-native";
import { useForm,Controller } from 'react-hook-form';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from '../Common/Icon';
import { currencyCode } from '../../configs/config';
import { toFixed } from '../../helpers/CommonFunction';
import Background from '../Common/Background';
import { Colors,Fonts,Sizes } from '../../constants/Themes';
import { t } from 'i18next';
import CustomButton from '../Common/CustomButton/CustomButton';
import CustomModal from '../Common/Modal';

const { width } = Dimensions.get('screen');
const rowSwipeAnimatedValues = {};
Array(20)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const transactionsList=[
    {
        key: '1',
        amount: 2000,
        profit: 100,
        apr: 9,
        dateAndTime: '14 April 2021 | 11:12 AM',
        status:"Staking"
    },
    {
        key: '2',
        amount: 1500,
        profit: 50,
        apr: 9,
        dateAndTime: '14 April 2021 | 11:12 AM',
        status:"Redeemable"
    },
]

const StakingComponent = ({
    onClickStack,
    onClickStakeContract,
    onclickSeeContract,
    data={},
    walletData={},
    totalStaking=0,
    totalProfit=0
}) =>{
    //console.log(data);


    const stakingContractList=[
        {
            key: '1',
            buyback_rate_percentage: data.buyback_rate_percentage,
            interest_rate_percentage: data.interest_rate_percentage,
            total_amount_staked: data.total_amount_staked,
            term: t("wallet:flexible"),
            status: t("wallet:active")
        }
    ]

    const balanceInfo = () => {
        let balance = (walletData?.fixed_token_balance) ? walletData.fixed_token_balance : 0;
        
        return(
            <View style={styles.balanceInfoContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.black17SemiBold }}>{currencyCode}</Text>
                    
                </View>
                
                <Text style={{ ...Fonts.gray13Medium, marginVertical: Sizes.fixPadding }}>{t("wallet:available_balance")}</Text>
                <Text style={{ ...Fonts.black19Bold }}>{toFixed(balance)}</Text>
                <View style={styles.timeLeftWrapStyle}>
                    <Pressable
                                            activeOpacity={0.9}
                                            onPress={ () => {onclickSeeContract()}}
                                        >
                                            <Text style={{ ...Fonts.black17SemiBold, }}>
                                                View Contract
                                            </Text>
                                        </Pressable>
                </View>
             
            </View>
        )
    }

    const stakingInfo = () => {
        let totalStakingCount = (data?.userDetails?.stake_count) ? data.userDetails.stake_count : 0;
        let totalStaking = (data?.userDetails?.staked) ? data.userDetails.staked : 0;
        return (
            <View style={styles.stakingInfoContainerStyle}>
                <View style={styles.stakingInfoWrapStyle}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ ...Fonts.gray13Medium }}>{t("wallet:number_of_stake")}</Text>
                        <Text style={{ ...Fonts.black17SemiBold, marginTop: Sizes.fixPadding - 5.0 }}>
                            {toFixed(totalStakingCount,0)}
                        </Text>
                    </View>
                    <View style={{ height: 35.0, width: 0.60, backgroundColor: 'gray' }}></View>
                    <View>
                        <Text style={{ ...Fonts.gray13Medium }}>{t("wallet:total_staking")}</Text>
                        <Text style={{ ...Fonts.black17SemiBold, marginTop: Sizes.fixPadding - 5.0 }}>
                            {toFixed(totalStaking)}
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
                    onPress={() => console.log("TOUCH")}
                >
                    <View style={styles.depositsContentStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>Holdings</Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {toFixed(data.item.amount)}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>APR</Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {toFixed(data.item.apr,1)}% 
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>Profit</Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {toFixed(data.item.profit)}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>Date & Time</Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {data.item.dateAndTime}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: (data.item.status == 'Staking')  ? '#FFAA33' : '#006400',
                        ...styles.depositsStatusContentStyle,
                    }}>
                        <Text style={{ ...Fonts.white14Medium, marginLeft: Sizes.fixPadding }}>
                            {data.item.status}
                        </Text>
                    </View>
                </TouchableOpacity>
            </TouchableHighlight>
    
        );

        const renderHiddenItem = (data, rowMap) => (
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={styles.backDeleteContinerStyle}
                    onPress={() => console.log("DELETE PRESS")}
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
                        <Text style={{ ...Fonts.white13Medium, alignSelf: 'center' }}>{t("wallet:redeem")}</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        );

        return (
            listData.length == 0 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.noWatchListDataContainerStyle}>
                        <Icon type="ionicon" name="eye-sharp" size={50} color="#8F8F8F" />
                    </View>
                    <Text style={{ ...Fonts.gray18Bold, marginTop: Sizes.fixPadding * 2.0 }}>
                        {t("app:no_data")}
                    </Text>
                </View>
            :
                <View style={styles.transactionContainer}>
                    <SwipeListView
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-100}
                        onSwipeValueChange={onSwipeValueChange}
                    />
                </View>

        )
    }

    const stakingContracts = () => {
        
        const [stakingListData, setStakingListData] = useState(stakingContractList);
        const onSwipeValueChange = swipeData => {
            const { key, value } = swipeData;
            rowSwipeAnimatedValues[key].setValue(Math.abs(value));
        };

        //console.log(listData);

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
                    onPress={() =>  onClickStakeContract() }
                >
                    <View style={styles.depositsContentStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>{t("wallet:reference_apr") } </Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {toFixed(data.item.interest_rate_percentage,1)}% 
                                </Text>
                            </View>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>{t("wallet:buyback_rate") }</Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {toFixed(data.item.buyback_rate_percentage,1)}% 
                                </Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>{t("wallet:term") } </Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {(data.item.term)}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ ...Fonts.gray12Medium }}>{t("wallet:total_amount_stake")}</Text>
                                <Text style={{ ...Fonts.black14Medium }}>
                                    {toFixed(data.item.total_amount_staked)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: (data.item.status == 'Staking')  ? '#FFAA33' : '#006400',
                        ...styles.depositsStatusContentStyle,
                    }}>
                        <Text style={{ ...Fonts.white14Medium, marginLeft: Sizes.fixPadding }}>
                            {data.item.status}
                        </Text>
                    </View>
                </TouchableOpacity>
            </TouchableHighlight>
    
        );

        const renderHiddenItem = (data, rowMap) => (
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={styles.backDeleteContinerStyle}
                    onPress={() => onClickStack() }
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
                        <Text style={{ ...Fonts.white13Medium, alignSelf: 'center' }}>{t("wallet:stake")}</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        );

        return (
            stakingListData.length == 0 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.noWatchListDataContainerStyle}>
                        <Icon type="ionicon" name="eye-sharp" size={50} color="#8F8F8F" />
                    </View>
                    <Text style={{ ...Fonts.gray18Bold, marginTop: Sizes.fixPadding * 2.0 }}>
                        {t("app:no_data")}
                    </Text>
                </View>
            :
                <View style={styles.transactionContainer}>
                    <SwipeListView
                        data={stakingListData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-100}
                        onSwipeValueChange={onSwipeValueChange}
                    />
                </View>

        )
    }

    const stakingButton = () => {
        return (
            <View>
                 <CustomButton text={t('wallet:stake')}   style={styles.stakingButtonContainerStyle}  onPress={() => onClickStack() }  />
                {/* <View style={styles.stakingButtonContainerStyle}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => onClickStack() }
                    >
                        <Text style={{ ...Fonts.white17Bold }}>
                            {t("wallet:stake")}
                        </Text>
                    </TouchableOpacity>
                    
                </View> */}
            </View>
        )
    }
    

    return(
        <Background bgColor={Colors.backColor}>
            <View style={{ flex: 1 }}>
                <View style={{ elevation: 3.0, borderBottomColor: 'gray' }}>
                    {balanceInfo()}
                    {stakingInfo()}
                </View>
                {stakingContracts()}
                {/* {transactions()} */}
            </View>
            {/* {stakingButton()} */}
        </Background>
    )
}

const styles = StyleSheet.create({
    timeLeftWrapStyle: {
        margin: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    balanceInfoContainerStyle :{
        alignItems: 'center', 
        backgroundColor: 'white', 
        paddingVertical: Sizes.fixPadding + 5.0 
    },
    stakingButtonContainerStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 20.0,
    },
    stakingInfoContainerStyle:{
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: 'white',
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    stakingInfoWrapStyle:{
        backgroundColor: '#F3F5FF',
        flexDirection: 'row', justifyContent: 'space-evenly',
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center'
    },
    noWatchListDataContainerStyle: {
        width: 100.0,
        height: 100.0,
        borderRadius: 75.0,
        backgroundColor: '#DFE0E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    transInfoContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 2.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
    },

    transactionContainer: {
        backgroundColor: Colors.backColor,
        flex: 1,
        marginVertical: Sizes.fixPadding
    },
    rowFront: {
        backgroundColor: Colors.backColor,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1.0,
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
    depositsStatusContentStyle: {
        flexDirection: 'row',
        paddingVertical: Sizes.fixPadding - 5.0,
        borderBottomLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default StakingComponent;