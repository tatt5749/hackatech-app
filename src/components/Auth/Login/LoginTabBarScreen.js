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
import { Fonts, Colors, Sizes  } from "../../../constants/Themes";
import i18n,{t} from "../../../services";
import EmailLogin from "./EmailLogin";
import PhoneLogin from "./PhoneLogin";

const LoginTabBarScreen=({
    loading,
    emailOnSubmit,
    phoneOnSubmit,
    onCreateAccountClick,
    onForgotPasswordClick
}) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Email' },
        { key: 'second', title: 'Phone Number' },
    ]);
    const {control,handleSubmit,formState:{errors}} = useForm();
    
    const layout = useWindowDimensions();
    const {navigate} = useNavigation();

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return (
                    <EmailLogin loading={loading} onSubmit={emailOnSubmit} onForgotPasswordClick={onForgotPasswordClick} onCreateAccountClick={onCreateAccountClick}/>
                );
            case 'second':
                return <PhoneLogin loading={loading} onSubmit={phoneOnSubmit} onForgotPasswordClick={onForgotPasswordClick} onCreateAccountClick={onCreateAccountClick} />;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            swipeEnabled={false}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: '#2497F3', }}
                    tabStyle={{
                        width: layout.width / 2.3,
                    }}
                    scrollEnabled={true}
                   
                    style={{ backgroundColor: 'white', }}
                    renderLabel={({ route, focused, color }) => (
                        <Text style={{ ...Fonts.gray12Medium }}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    )
}

export default LoginTabBarScreen;