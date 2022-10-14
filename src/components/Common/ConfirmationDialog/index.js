import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, View, TouchableHighlight, Pressable, StyleSheet, Text,TouchableOpacity,FlatList,Modal  } from "react-native";

import Dialog from "react-native-dialog";
import { Colors,Fonts,Sizes } from '../../../constants/Themes';
import i18n,{t} from '../../../services';
const { width } = Dimensions.get('screen');

const ConfirmationDialog = ({
    buttonConfirmTitle=t("app:confirm"),
    buttonCanceltitle=t("app:cancel"),
    loading,
    visible,
    onAgreeClick,
    onCancelClick,
    title,
    children
}) => {
    let btnDisabled = (loading) ? true : false;

    const modal = () => {
        return (
            <View>
                <Modal
                animationType="none"
                visible={visible}
                transparent={false}
                >

                </Modal>
            </View>
        )
    }

    const dialog = () => {
        return (
            <Dialog.Container
                visible={visible}
                contentStyle={styles.modalWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={styles.modalContentWrapStyle}>
                    <Text style={styles.modalTitleStyle}>
                        {title}
                    </Text>
                    <View style={{
                            height: 0.5,
                            marginBottom: Sizes.fixPadding + 10.0,
                            marginHorizontal: Sizes.fixPadding * 2.0,
                        }}></View>
                    
                    {children}
                    
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onAgreeClick}
                        disabled={btnDisabled}
                        style={[
                            styles.readyButtonStyle,
                            {backgroundColor: (loading) ?   Colors.disabledColor : Colors.primaryColor},
                        ]}
                    >
                        
                        <Text style={{ ...Fonts.white17SemiBold }}>
                            {buttonConfirmTitle} 
                        </Text>
                        {loading && <ActivityIndicator size="small" color="yellow" />}
                        
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onCancelClick}
                        style={[
                            styles.holdOnButtonStyle,
                            {backgroundColor: (loading) ?   Colors.disabledColor : Colors.whiteColor},
                        ]}
                        disabled={btnDisabled}
                    >
                        <Text style={{ ...Fonts.black17SemiBold }}>
                            {buttonCanceltitle}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
        )
    }

    return (
        <View  >
           <Modal
                animationType="none"
                visible={visible}
                transparent={true}
            >
                <View style={styles.modalWrapStyle2}>
                <View style={styles.modalContentWrapStyle}>
                    <Text style={styles.modalTitleStyle}>
                        {title}
                    </Text>
                    <View style={{
                            height: 0.5,
                            marginBottom: Sizes.fixPadding + 10.0,
                            marginHorizontal: Sizes.fixPadding * 2.0,
                        }}></View>
                    
                    {children}
                    
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onAgreeClick}
                        disabled={btnDisabled}
                        style={[
                            styles.readyButtonStyle,
                            {backgroundColor: (loading) ?   Colors.disabledColor : Colors.primaryColor},
                        ]}
                    >
                        
                        <Text style={{ ...Fonts.white17SemiBold }}>
                            {buttonConfirmTitle} 
                        </Text>
                        {loading && <ActivityIndicator size="small" color="yellow" />}
                        
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onCancelClick}
                        style={[
                            styles.holdOnButtonStyle,
                            {backgroundColor: (loading) ?   Colors.disabledColor : Colors.whiteColor},
                        ]}
                        disabled={btnDisabled}
                    >
                        <Text style={{ ...Fonts.black17SemiBold }}>
                            {buttonCanceltitle}
                        </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
           
        </View>
    )
}

const styles = StyleSheet.create({
    modalTitleStyle : {
        alignSelf: 'center', 
        ...Fonts.black16SemiBold,                
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    modalWrapStyle: {
        borderRadius: Sizes.fixPadding + 5.0,
        width: width - 40,
    },
    modalWrapStyle2: {
        flex: 1,
        justifyContent: 'center',
        alignItems:"center",
        backgroundColor: 'rgba(180, 180, 180, 0.5)',
    },
    modalContentWrapStyle:{
        backgroundColor: '#ffffff', 
        //alignItems: 'center',
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
});

export default ConfirmationDialog