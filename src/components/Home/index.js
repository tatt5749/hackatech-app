import React, { useState,useEffect, useRef, useContext } from 'react';
import {useNavigation} from '@react-navigation/native';
import ContentLoader from "react-native-easy-content-loader";
import {
    StyleSheet,
    FlatList,
    View,
    RefreshControl,
    SafeAreaView,
    Text,
    Image,
    StatusBar
} from 'react-native';
import { Fonts, Colors, Sizes  } from '../../constants/Themes';
import i18n,{t} from '../../services';
import Icon from '../Common/Icon';
import { toFixed } from '../../helpers/CommonFunction';

const HomeComponent = ({
    userData,
    overviewData,
    loading,
    onRefresh
}) => {
    const {navigate} = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);
    const fixedToken = toFixed(overviewData?.token_total_supply ?? 0) ;
    const fixedgovToken = toFixed(overviewData?.governance_token_total_supply ?? 0) ;
    const totalStake = toFixed(overviewData?.total_staked_token ?? 0) ;
    
    const portfolioList = [
        {
            id: '1',
            image: require('../../../assets/images/crypto_icon/btc.png'),
            name: overviewData?.token_symbol,
            amount: fixedToken,
            isPositive: true,
            percentage: 20,
        },
        // {
        //     id: '2',
        //     image: require('../../../assets/images/crypto_icon/eth.png'),
        //     name: overviewData?.governance_token_symbol,
        //     amount: fixedgovToken,
        //     isPositive: false,
        //     percentage: 3,
        // },
    ];

    const userWelcome = () => {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={styles.userWelcomeContainerStyle}>
                    <View>
                        <Text style={{ ...Fonts.gray17Medium, }}>{t("app:welcome")}</Text>
                        <Text style={{ ...Fonts.black22Bold, marginTop: Sizes.fixPadding - 5.0, }}>
                            {userData.name}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    const balanceAndProfitInfo = () =>{
        
        let fixedSymbol = overviewData?.token_symbol;

        return (
            <View style={{
                paddingHorizontal: Sizes.fixPadding * 2.0,
                marginTop: 20.0,
            }}>
                {
                    loading 
                    ?
                        <View style={styles.balanceAndProfitInfoContainerStyle}>
                            <ContentLoader active  pRows={6}  />
                        </View>
                    :
                    <View style={styles.balanceAndProfitInfoContainerStyle}>
                        <Text style={{ ...Fonts.white16Medium }}>{  overviewData.token_name ?? "" }</Text>
                        <Text style={{ ...Fonts.white30Bold, marginVertical: Sizes.fixPadding }}>{ fixedSymbol }  { fixedToken} </Text>
                        <Text style={{ ...Fonts.white16Medium, marginBottom: Sizes.fixPadding, marginTop: Sizes.fixPadding + 5.0 }}>
                            {t("wallet:total_staking")}
                        </Text>
                        <Text style={{ ...Fonts.white25Bold }}>{ fixedSymbol } {totalStake}</Text>
                    </View>
                }
                
                {/* <View style={{ position: 'absolute', right: 40.0, bottom: 20.0, }}>
                    <View style={styles.balanceAndProfitPercentageInfoStyle}>
                        <Icon type="ant" name="caretup" size={12} color={Colors.whiteColor} />
                        <Text style={{ ...Fonts.whiteSemiBold, marginLeft: 7.0 }}>+10%</Text>
                    </View>
                </View> */}
            </View>
        )
    }
 
    const myPortfolioTitle = () =>{
        return (
            <Text style={{
                ...Fonts.black19SemiBold,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 5.0,
    
            }}>
                Token Portfolio
            </Text>
        )
    }

    const portfolioInfo = () => {
        const renderItem = ({ item }) => (
            
                loading 
                    ?
                        <View style={styles.portfolioContainerStyle}>
                            <ContentLoader active  pRows={6}  />
                        </View>
                        
                    :
                    <View style={styles.portfolioContainerStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={item.image}
                            style={{ height: 60.0, width: 60.0, borderRadius: 30.0 }}
                            resizeMode="contain"
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.black17Medium }}>{item.name}</Text>
                    </View>
                    <View>
                        <Text style={{ ...Fonts.gray17Medium, marginBottom: Sizes.fixPadding - 3.0 }}>Portfolio</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ ...Fonts.black22Bold }}>
                                {`${item.amount}`}
                            </Text>
                        </View>
                    </View>
                </View>
            
            
        )
    
        return (
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={portfolioList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding }}
            />
        )
    }


    return (
        <SafeAreaView style={{}}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <FlatList 
                ListHeaderComponent={
                    <>
                        {userWelcome()}
                        {balanceAndProfitInfo()}
                        {myPortfolioTitle()}
                        {portfolioInfo()}
                    </>
                }
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}>
                    </RefreshControl>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    userWelcomeContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding * 2.0,
    },
    balanceAndProfitInfoContainerStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0
    },
    balanceAndProfitPercentageInfoStyle: {
        flexDirection: 'row',
        backgroundColor: "rgba(255,255,255,0.22)",
        alignItems: 'center',
        paddingHorizontal: 12.0,
        paddingVertical: 12.0,
        borderRadius: 22.0
    },
    portfolioContainerStyle: {
        height: 170.0,
        width: 230.0,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginHorizontal: 10.0,
        marginVertical: 15.0,
        paddingHorizontal: 10.0,
        paddingVertical: 10.0,
        borderRadius: 20,
        elevation: 3.0,
    }
});

export default HomeComponent;