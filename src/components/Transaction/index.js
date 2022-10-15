import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet,View,Text,TouchableOpacity,SafeAreaView } from 'react-native';
import { useForm,Controller } from 'react-hook-form';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { BottomSheet } from "react-native-elements";
import Icon from '../Common/Icon';
import { Colors,Fonts,Sizes } from '../../constants/Themes';
import i18n,{t} from '../../services';
import Background from '../Common/Background';
import { STATUS_LISTS,ALL } from '../../constants/Enums/GeneralStatus';
import TransactionTabBarComponent from './TransactionTabBar';

const TransactionComponent = ({
    navigation,
    transactionLists,
    transactionListsLoading
}) => { 
    const [showFilterSheet,setShowFilterSheet] = useState(false);
    const [selectedStatusIndex , setSelectedStatusIndex] =  useState(ALL);
    
    const filterSheet =() =>{
        return (
            <BottomSheet
                isVisible={showFilterSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                modalProps={{ onRequestClose: () => { setShowFilterSheet(false) }, }}
            >
                <View style={styles.bottomSheetWrapStyle}>
                    <Text style={{ marginBottom: Sizes.fixPadding * 2.0, textAlign: 'center', ...Fonts.black20Bold }}>
                    {t("transaction:select_filter")}
                    </Text>
                    {statusInfo()}
                    {resetAndApplyInfo()}
                </View>
            </BottomSheet>
        )
    }

    const resetAndApplyInfo = () => { 
        return (
            <View style={styles.resetAndApplyInfoWrapStyle}>
                <Text style={{ ...Fonts.primaryColor20SemiBold }}>
                    {t("transaction:reset")}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { setShowFilterSheet(false) }}
                    style={styles.applyButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    {t("transaction:apply")}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const statusInfo=() => { 
        return (
            <View>
                <Text style={{ ...Fonts.black16SemiBold }}>
                    {t("transaction:status")}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', }}>
                    { 
                        STATUS_LISTS.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => setSelectedStatusIndex(item) } 
                                key={`${item}`}
                                style={{
                                    marginRight: index == STATUS_LISTS.length - 1 ? 0.0 : Sizes.fixPadding * 0.5,
                                    borderRadius: Sizes.fixPadding * 2.0,
                                    backgroundColor: selectedStatusIndex == item ? "#808080" : Colors.greyColor,
                                    ...styles.optionStyle,
                                }}
                            >
                                <Text style={selectedStatusIndex == item ? { ...Fonts.black13Regular } : { ...Fonts.black13Regular }}>
                                    {t("app:"+item)}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    const header = () =>{
        return (
            <View style={styles.headerWrapStyle}>
                <Text numberOfLines={1} style={{ flex: 1, ...Fonts.black19SemiBold }}>
                    {t("transaction:transactions")}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShowFilterSheet(true) }
                    style={styles.filterIconWrapStyle}
                >
                    <Icon type="material" name="filter-list" size={24} color={Colors.primaryColor}/>
                </TouchableOpacity>
            </View>
        )
    }
    //console.log(transactionListsLoading);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {header()}
            <TransactionTabBarComponent navigation={navigation} transactionLists={transactionLists} loading={transactionListsLoading}/>
            {filterSheet()}
        </SafeAreaView>
        // <Background bgColor={Colors.backColor}>
        //     <View style={{ flex: 1 }}>
        //         {header()}
        //     </View>
        //     {filterSheet()}
        // </Background>
    )
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center', backgroundColor: 'white'
    },
    filterIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)'
    },
    bottomSheetWrapStyle: {
        paddingHorizontal: 20.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: Sizes.fixPadding * 3.0,
        borderTopRightRadius: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.whiteColor
    },
    optionStyle: {
        paddingVertical: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    resetAndApplyInfoWrapStyle: {
        marginBottom: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    applyButtonStyle: {
        flex: 1,
        marginLeft: Sizes.fixPadding * 3.0,
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
    },
})

export default TransactionComponent;