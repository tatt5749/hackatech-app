import React, { useRef, useState } from "react";
import {
    Text,
    View,
    useWindowDimensions,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Image,
    Animated,
    TextInput
} from "react-native";
import { useForm,Controller } from 'react-hook-form';
import { TabView, TabBar } from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';

import i18n,{t} from "../../services";
import { ACTION_LISTS,ACTION_RECEIVE,ACTION_SEND,ACTION_STAKE,ACTION_UNSTAKE } from "../../constants/Enums/WalletActionType";
import { Fonts,Colors,Sizes } from "../../constants/Themes";
import TransactionListsComponent from "./TransactionList";


const TransactionTabBarComponent=({
    navigation,
    transactionLists,
    loading=true
}) => {
    const layout = useWindowDimensions();
    const arr = [{"index" : "all","key" : "all"}];
    const [index, setIndex] = useState(0);
    let [routes] = useState([...arr, ...ACTION_LISTS]);

    const renderScene = ({ route, jumpTo }) => { 
        return <TransactionListsComponent transactionLists={transactionLists} loading={loading}/>;
        // switch (route.index) {
        //     case "all":
        //         return <TransactionListsComponent transactionLists={transactionLists} loading={loading}/>;
        //     case ACTION_RECEIVE:
        //         return <TransactionListsComponent transactionLists={transactionLists} loading={loading}/> ;
        //     case ACTION_SEND:
        //         return <TransactionListsComponent transactionLists={transactionLists} loading={loading}/>;
        //     case ACTION_STAKE:
        //         return <TransactionListsComponent transactionLists={transactionLists} loading={loading}/>;
        //     case ACTION_UNSTAKE:
        //         return <TransactionListsComponent transactionLists={transactionLists} loading={loading}/>;
        // }
    };
    
    const onTabPresss  = ({route, preventDefault}) => {
        preventDefault();
    }
    
    return(
        <TabView 
            lazy
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            onTabPress={onTabPresss}
            swipeEnabled={false}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: '#2497F3', }}
                    tabStyle={{
                        width: layout.width / 4.3,
                    }}
                    scrollEnabled={true}
                    style={{ backgroundColor: 'white', }}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={{ ...Fonts.gray12Medium }}>
                            {t("wallet:"+route.index)}
                        </Text>
                    )}
                />
            )}
        />
    )
}

export default TransactionTabBarComponent;