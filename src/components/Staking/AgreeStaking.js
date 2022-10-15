import React, { useContext, useEffect, useRef,useState } from 'react';
import { Animated, SafeAreaView, View, TouchableHighlight, ActivityIndicator, StyleSheet, Text,TouchableOpacity,Modal,Dimensions  } from "react-native";
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
import Dialog from "react-native-dialog";
import Loading from '../Common/Loading';

const { width } = Dimensions.get('screen');

const AgreeStakingComponent = ({
    visible=true,
    onAgreeClick,
    onRejectClick,
    loading
}) => {
    const dialog = () => {
        let approveBtnStyle = (loading) ? styles.disableButtonStyle : styles.readyButtonStyle;
        let rejectBtnStyle = (loading) ? styles.disableButtonStyle : styles.holdOnButtonStyle;

        let btnDisabled = (loading) ? true : false;

        return (
            <View  >
            <Dialog.Container
                visible={visible}
                contentStyle={styles.modalWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={styles.modalContentWrapStyle}>
                    <Text style={styles.modalTitleStyle}>
                        {t("wallet:agree_staking_info_title")}
                    </Text>
                    <Text style={{ marginVertical: Sizes.fixPadding, textAlign: 'center', ...Fonts.gray13Medium }}>
                        {t("wallet:agree_stacking_info")}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            onAgreeClick()
                        }}
                        disabled={btnDisabled}
                        style={[
                            styles.readyButtonStyle,
                            {backgroundColor: (loading) ?   Colors.disabledColor : Colors.primaryColor},
                        ]}
                    >
                        
                        <Text style={{ ...Fonts.white17SemiBold }}>
                            {t("wallet:button_yes_approve")} 
                        </Text>
                        {loading && <ActivityIndicator size="small" color="yellow" />}
                        
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() =>  onRejectClick() }
                        style={[
                            styles.holdOnButtonStyle,
                            {backgroundColor: (loading) ?   Colors.disabledColor : Colors.whiteColor},
                        ]}
                        disabled={btnDisabled}
                    >
                        <Text style={{ ...Fonts.black17SemiBold }}>
                            {t("wallet:button_no_goback")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
            </View>
        )
    }
    
    return(
        <View>
            {dialog()}
        </View>
    )
}

const styles = StyleSheet.create({
    
    modalTitleStyle : {
        ...Fonts.black16Bold
    },
    modalWrapStyle: {
        borderRadius: Sizes.fixPadding + 5.0,
        width: width - 40,
    },
    modalContentWrapStyle:{
        backgroundColor: '#ffffff', 
        alignItems: 'center',
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
    },
    holdOnButtonStyle: {
        // backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        borderRadius: Sizes.fixPadding * 2.5,
        paddingVertical: Sizes.fixPadding,
        borderColor: Colors.disabledColor,
        borderWidth: 1.0,
        //marginBottom: Sizes.fixPadding * 2.0,
    },
    readyButtonStyle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        //backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        borderRadius: Sizes.fixPadding * 2.5,
        paddingVertical: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.0,
    }
})
export default AgreeStakingComponent;