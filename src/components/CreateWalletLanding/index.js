import React, { useContext, useEffect, useRef, useState } from 'react';
import { BackHandler, SafeAreaView, View, StatusBar, Image, StyleSheet, Text,TouchableOpacity,FlatList,Dimensions  } from "react-native";


import { Colors,Fonts,Sizes } from '../../constants/Themes';
import i18n,{t} from '../../services';
import Background from '../Common/Background';
import Icon from '../Common/Icon';
import { objectLength } from '../../helpers/CommonFunction';
import CopyClipboard from '../Common/CopyClipboard';
import { ACTION_LISTS } from '../../constants/Enums/WalletActionType';
import TransactionListsComponent from '../Transaction/TransactionList';
import Container from '../Common/Container';
import CustomButton from '../Common/CustomButton/CustomButton';
import { currencyCode } from '../../configs/config';
import Loading from '../Common/Loading';
import SuccessMessageModal from '../Common/SuccessMessageModal';

const CreateWalletLandingComponent = ({
    onClick,
    loading,
    isSuccess,
    onNextClick,
}) => {
    const logo = () =>{
        return (
            <View>
                <Image source={require('../../../assets/images/icon/primary-color/wallet.png')}
                    style={styles.logoImageStyle}
                    resizeMode="contain"
                />
            </View>
        )
    }

    const createWalletInfo = () =>{
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.gray15Medium, marginTop: Sizes.fixPadding - 3.0 }}>
                    {t("wallet:create_wallet_info")} {currencyCode}
                </Text>
            </View>
        )
    }

    const createButton = () => {
        return (
            <View>
                <CustomButton text={t('app:create')}   onPress={(onClick)}/>
            </View>
        )
    }


    return(
        <Background bgColor={Colors.backColor}>
            <View style={{ flex: 1 }} >
                {logo()}
                {createWalletInfo()}
                {createButton()}
            </View>
            <Loading visible={loading} />
            <SuccessMessageModal visible={isSuccess} onClick={onNextClick} message={t("wallet:create_wallet_success")}/>
        </Background>
    )
}

const styles = StyleSheet.create({
    logoImageStyle: {
        alignSelf: 'center',
        width: 100.0,
        height: 100.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
})

export default CreateWalletLandingComponent;