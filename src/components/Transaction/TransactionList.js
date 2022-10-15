import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet,View,Text,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native';
import { useForm,Controller } from 'react-hook-form';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { BottomSheet } from "react-native-elements";
import Icon from '../Common/Icon';
import { Colors,Fonts,Sizes } from '../../constants/Themes';
import i18n,{t} from '../../services';
import LoadingComponent from '../Common/LoadingComponent';
import { toFixed } from '../../helpers/CommonFunction';

const TransactionListsComponent = ({
    transactionLists,
    loading=false
}) => { 
    const [loadFlag , setLoadFlag ] = useState(loading)

    // useEffect(() => {
    //     console.log("Loading ---> " + loading)
    //     setLoadFlag(loading);
    // }, [loading]);

   
    // setTimeout(() => {
    //     setLoadFlag(false);
    // }, 2000);

    //console.log(loadFlag,loading);

    const renderItem = ({ item }) => (
        <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}>    
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    console.log(item.id)
                }}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View 
                        style={{
                            ...styles.transactionIconContainerStyle,
                            backgroundColor: item.isSuccess == true ? Colors.greenColor : Colors.greenColor,
                            }}
                    >
                        {item.isSuccess == true ?
                            item.isDeposite ?
                                
                            <Icon type="materialCommunity" name="arrow-bottom-left" size={24} color={Colors.whiteColor} />:
                            <Icon type="materialCommunity" name="arrow-bottom-right" size={24} color={Colors.whiteColor} />
                            :
                            <Icon type="materialCommunity" name="close" size={24} color={Colors.whiteColor} />
                        }
                    </View>
                    <View style={{ marginHorizontal: Sizes.fixPadding }}>
                        <Text style={{ ...Fonts.black16Medium }}>
                            {/* {item.key} */}
                            {t("wallet:stake")}
                        </Text>
                        <Text style={{ ...Fonts.gray13Medium, marginTop: Sizes.fixPadding - 5.0 }}>
                            {item.staked_date}
                        </Text>
                    </View>
                </View>
                <Text style={{ ...Fonts.black16Bold }}>{toFixed(item.initial_staked_amount)}</Text>
            </TouchableOpacity>
            <View style={{
                backgroundColor: 'gray', marginVertical: Sizes.fixPadding * 2.0,
                height: 0.60,
            }}></View>
        </View>
    )

    

    return (
        <>
            {
            loadFlag ? 
                
                <LoadingComponent />
            :   <FlatList
                    data={transactionLists}
                    keyExtractor={(item) => `${item.key}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                />
            }
        </>
        
        
    )
}

const styles = StyleSheet.create({
    transactionIconContainerStyle: {
        height: 45.0,
        width: 45.0,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
})

export default TransactionListsComponent;