import React, { useContext, useEffect, useRef, useState } from 'react';
import { RefreshControl, SafeAreaView, View, StatusBar, Image, StyleSheet, Text,TouchableOpacity,FlatList,Dimensions,Pressable  } from "react-native";
import ContentLoader from "react-native-easy-content-loader";

import { Colors,Fonts,Sizes } from '../../constants/Themes';
import i18n,{t} from '../../services';
import Background from '../Common/Background';
import Icon from '../Common/Icon';
import { objectLength,isNull } from '../../helpers/CommonFunction';
import CopyClipboard from '../Common/CopyClipboard';
import { ACTION_LISTS } from '../../constants/Enums/WalletActionType';
import TransactionListsComponent from '../Transaction/TransactionList';
import { toFixed } from '../../helpers/CommonFunction';
import { currencyCode } from '../../configs/config';
import Loading from '../Common/Loading';
import SuccessMessageModal from '../Common/SuccessMessageModal';

const WalletComponent = ({
    walletData,
    walletLoading,
    onRefresh,
    transactionLists,
    transactionListsLoading,
    onClickWalletAction,
    onclickSeeAllTransaction,
    walletAddress,
    onClickCreateWalletAction,
    onClickNextCreateWalletAction,
    createWalletLoading,
    createWalletIsSuccess,
    onclickSeeContract
}) => {
    const { width } = Dimensions.get('screen');
    const [refreshing, setRefreshing] = React.useState(false);
    const walletAmount = walletData?.fixed_token_balance ?? 0.00;

    const walletInfo = () => {
        return (
            <View style={styles.walletInfoWrapStyle}>
                {
                    walletLoading
                    ?
                        <ContentLoader active  pRows={6}  />

                    :
                    <View >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ ...Fonts.white16Medium,flexShrink: 1 }}>
                                        {t("wallet:my_wallet")}
                                    </Text>
                                    {/* <View style={styles.timeLeftWrapStyle}>
                                        <Pressable
                                            activeOpacity={0.9}
                                            onPress={ () => {onclickSeeContract()}}
                                        >
                                            <Text style={{ ...Fonts.white16Medium, }}>
                                                View Contract
                                            </Text>
                                        </Pressable>
                                    </View> */}
                                    
                                </View>
                                
                                <Text style={{ marginTop: Sizes.fixPadding , ...Fonts.white25Bold }}>
                                    {toFixed(walletAmount)} {currencyCode}
                                </Text>
                            </View>
                        </View>
                        {
                            
                            (!isNull(walletAddress)  ) && 
                                <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:Sizes.fixPadding+30 }}>
                                    <Text style={{ ...Fonts.white14Medium, flexShrink: 1 }}>
                                        {walletAddress}
                                    </Text>
                                    <CopyClipboard 
                                        copyString={walletAddress}
                                        iconStyle={{ marginLeft: Sizes.fixPadding + 5.0 }}
                                        modalMessage={t("wallet:copied_address")}
                                    />
                                </View>
                        }
                    </View>

                }
                
            </View>
        )
    }

    const setWalletActionInfo = () => {
        let btnDisabled =  ( walletLoading ) ? true : false ;
        const renderItem = ({ item }) => (
            <View style={styles.setWalletActionInfoContentStyle}>
                <Pressable
                    disabled={btnDisabled}
                    activeOpacity={0.9}
                    onPress={ () => {onClickWalletAction(item.screen)}}
                    style={{
                        ...styles.setLimitAndLockCardContentStyle,
                        marginRight: Sizes.fixPadding * 2.0,
                        backgroundColor: btnDisabled ?  Colors.lightGrayColor : Colors.whiteColor,

                    }}
                >
                    <Icon type={item.iconType} name={item.icon} size={24} color="blue" />
                    <Text numberOfLines={1}
                        style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                        {t("wallet:"+item.index)}
                    </Text>
                </Pressable>
            </View>
        )
        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={ACTION_LISTS}
                keyExtractor={(item) => `${item.index}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
            />
        )
    }

    const recentTransactionTitle = () => {
        return (
            <View style={styles.titleWrapStyle}>
                <Text style={{
                    ...Fonts.black19SemiBold,
                }}>
                    {t("wallet:recent_transaction")}
                </Text>
                <TouchableOpacity>
                    <Text 
                        style={{ ...Fonts.primaryColor15Medium }}
                        onPress={onclickSeeAllTransaction}
                    >
                        {t("wallet:view_all")}
                    </Text>
                </TouchableOpacity>
                
            </View>
        )
    }

    const RecentTransaction = () => {
        return (
            <View>
                {recentTransactionTitle()}
                <TransactionListsComponent transactionLists={transactionLists} loading={transactionListsLoading}/>
            </View>
        )
    }

    const CreateWalletInfo = () =>{
        return (
            <View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => onClickCreateWalletAction('Deposit')}
                    style={{
                        paddingHorizontal: Sizes.fixPadding * 2.0,
                        paddingTop: Sizes.fixPadding,
                    }}
                >
                    <View style={styles.createWalletContainerStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.walletIconContainerStyle}>
                                <Image
                                    source={require('../../../assets/images/icon/primary-color/wallet.png')}
                                    resizeMode="contain"
                                    style={{ height: 30.0, width: 30.0 }}
                                />
                            </View>
                            <View style={{ paddingLeft: Sizes.fixPadding, width: width / 1.6, }}>
                                <Text style={{ ...Fonts.black17SemiBold, marginTop: Sizes.fixPadding - 5.0 }}>
                                    {t("wallet:create_wallet")}
                                </Text>
                            </View>
                            <Icon type="material" name="arrow-forward-ios" size={20} color={Colors.primaryColor} style={{ alignSelf: 'center' }}/> 
                        </View>
                        {/* <View style={styles.walletIconContainerStyle}>
                            <Image
                                source={require('../../../assets/images/icon/primary-color/wallet.png')}
                                resizeMode="contain"
                                style={{ height: 30.0, width: 30.0 }}
                            />
                        </View>
                        <View style={{ paddingLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.black17SemiBold, marginTop: Sizes.fixPadding - 5.0 }}>
                                $152
                            </Text>
                        </View>
                        <Icon type="ionicon" name="chevron-forward" size={20} color={Colors.primaryColor} style={{ alignSelf: 'center' }}/> */}
                    </View>
                </TouchableOpacity>
                <Loading visible={createWalletLoading} />
            </View>
        )
    }

    const ShowCreateWalletDialog = () => {
        return (
            <View>  
                <SuccessMessageModal visible={createWalletIsSuccess} onClick={onClickNextCreateWalletAction} message={t("wallet:create_wallet_success")}/>
            </View>
            
        )
    }



    return (
        <SafeAreaView style={{}}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            
            <FlatList 
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}>
                    </RefreshControl>
                }
                ListHeaderComponent={
                    <>
                        
                        {walletInfo()}
                        {setWalletActionInfo()}
                        {
                            !isNull(walletAddress)  
                            ?
                                createWalletIsSuccess 
                                ? 
                                    <ShowCreateWalletDialog />
                                :
                                    <RecentTransaction /> 
                            :
                                <CreateWalletInfo />

                        }
                    </>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    timeLeftWrapStyle: {
        marginLeft: Sizes.fixPadding + 120.0,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        //paddingHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    createWalletContainerStyle: {
        
        backgroundColor: '#DBE1FF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        marginTop:Sizes.fixPadding
    },
    walletIconContainerStyle: {
        height: 55.0,
        width: 55.0, 
        borderRadius: 27.5,
        backgroundColor: 'rgba(75,106,255,0.25)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    walletInfoWrapStyle: {
        backgroundColor: Colors.primaryColor,
        justifyContent: 'space-between',
        height: 170.0,
        borderRadius: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        padding: Sizes.fixPadding + 5.0,
        
    },
    setWalletActionInfoContentStyle : {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0,
        //marginBottom: Sizes.fixPadding
    },
    setLimitAndLockCardContentStyle: {
        flex: 0.43,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        height: 40.0,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding + 3.0,
        flexDirection: 'row'
    },
    
    titleWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: Sizes.fixPadding * 2.0,
        //marginTop:Sizes.fixPadding + 10.0,
        //marginBottom:Sizes.fixPadding + 10.0,
    },
})

export default WalletComponent;