import React, { useContext, useEffect, useRef } from 'react';
import { BackHandler, SafeAreaView, View, StatusBar, Image, StyleSheet, Text,TouchableOpacity,FlatList  } from "react-native";
import { useForm,Controller } from 'react-hook-form';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Background from '../Common/Background';
import { Colors,Fonts,Sizes } from '../../constants/Themes';
import { t } from 'i18next';
import OutlineInput from '../Common/CustomInput/OutlineInput';
import CustomButton from '../Common/CustomButton/CustomButton';
import { toFixed } from '../../helpers/CommonFunction';
import Loading from '../Common/Loading';
import SuccessMessageModal from '../Common/SuccessMessageModal';

const SendComponent = ({
    onSubmit,
    currentBalance,
    minAmount,
    maxAmount,
    error,
    loading,
    onNextClick,
    isSucess=false
}) =>{
    const {control,handleSubmit,formState:{errors},setValue,watch,register } = useForm();

    const currentBalanceInfo = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.black19Bold }}>{toFixed(currentBalance)}</Text>
                <Text style={{
                    ...Fonts.black13Medium,
                    marginBottom: Sizes.fixPadding * 3.0,
                    marginTop: Sizes.fixPadding - 5.0
                }}>{t("wallet:current_balance")}</Text>
            </View>
        )
    }

    const walletAddressTextField = () => {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}>
                <OutlineInput 
                    name="wallet_address"
                    label={t("input:wallet_address")}
                    multiline={true}
                    rules={{ 
                        required:t('validation:required',  {attribute :  t('input:wallet_address')} ), 
                    }}
                    control={control}
                    errorMessage={error?.error?.wallet_address?.[0]}
                />
            </View>
        )
    }

    const sendAmountTextField = () => {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0,paddingTop: Sizes.fixPadding + 5.0, }}>
                <OutlineInput 
                    name="send_amount"
                    label={t("input:send_amount")}
                    keyboardType="decimal-pad"
                    multiline={true}
                    rules={{ 
                        required:t('validation:required',  {attribute :  t('input:send_amount')} ), 
                        pattern: {
                            value: /^\d+(\.\d+)?$/,
                            message: t('validation:numeric',  {attribute :  t('input:send_amount')} ), 
                        },
                        validate: (val) => {
                            if (parseFloat(val) > parseFloat(maxAmount)) {
                              return t('validation:gte_numeric',  {attribute :  t('input:send_amount'), value: maxAmount } )
                            }
                            if (parseFloat(val) < parseFloat(minAmount)) {
                                return t('validation:lte_numeric',  {attribute :  t('input:send_amount'), value: minAmount } )
                              }

                        }
                    }}
                    control={control}
                    errorMessage={error?.error?.send_amount?.[0]}
                />
            </View>
        )
    }

    const minMaxLimitInfo = () => {
        return (
            <Text style={{ ...Fonts.black15Medium, alignSelf: 'center', }}>
                Min {toFixed(minAmount)}, Max {toFixed(maxAmount)}
            </Text>
        )
    }

    const sendButton = () => {
        return (
            <CustomButton text={t('app:send')}   onPress={handleSubmit(onSubmit)}/>
        )
    }

    return(
        <Background bgColor={Colors.backColor}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {currentBalanceInfo()}
                {walletAddressTextField()}
                {sendAmountTextField()}
                {minMaxLimitInfo()}
                {sendButton()}
                <Loading visible={loading} />
                <SuccessMessageModal visible={isSucess} onClick={onNextClick} message={t("wallet:transaction_successful")}/>
            </View>
           
        </Background>
    )
}

const styles = StyleSheet.create({
   
})

export default SendComponent;