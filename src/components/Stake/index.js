import React, { useContext, useEffect, useRef, useState } from 'react';
import { BackHandler, SafeAreaView, View, StatusBar, Image, StyleSheet, Text,TouchableOpacity,FlatList  } from "react-native";
import { useForm,Controller } from 'react-hook-form';


import Background from '../Common/Background';
import { Colors,Fonts,Sizes } from '../../constants/Themes';
import { currencyCode } from '../../configs/config';
import i18n,{t} from '../../services';
import Icon from '../Common/Icon';
import { toFixed } from '../../helpers/CommonFunction';
import OutlineInput from '../Common/CustomInput/OutlineInput';
import CustomButton from '../Common/CustomButton/CustomButton';
import Loading from '../Common/Loading';
import SuccessMessageModal from '../Common/SuccessMessageModal';

const StackComponent = ({
    rate=0,
    currentBalance=0,
    minAmount=0,
    maxAmount=0,
    error,
    onSubmit,
    loading,
    onNextClick,
    isSucess=false
}) =>{
    const {control,handleSubmit,formState:{errors},setValue,watch,registe,getValues } = useForm();
    const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true);
    const [agreeTerm , setAgreeTerm] = useState(false);

    const stackInfo = () => {
        return (
            <View style={styles.containerWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom: Sizes.fixPadding }}>
                        <Image
                            source={require('../../../assets/images/icon/coin-logo.png')}
                            style={{ width: 20.0, height: 30.0, resizeMode: 'contain', tintColor: Colors.primaryColor }}
                        />
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.black15SemiBold }}>
                        {currencyCode}
                    </Text>
                </View>
                <View style={{ marginVertical: Sizes.fixPadding - 6.0,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.gray13Medium }}>
                        {t("wallet:reference_apr")}
                    </Text>
                    <Text style={{ ...Fonts.successColor13Medium }}>
                        {rate} %
                    </Text>
                </View>
                <View style={{ marginVertical: Sizes.fixPadding - 6.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.gray13Medium }}>
                        {t("wallet:term")}
                    </Text>
                    <Text style={{ ...Fonts.black13Regular }}>
                        {t("wallet:flexible")}
                    </Text>
                </View>
            </View>
        )
    }

    const currentBalanceInfo = () => {
        return (
            <View style={{ alignItems: 'center' ,marginTop: Sizes.fixPadding * 5.0}}>
                <Text style={{ ...Fonts.black19Bold }}>{toFixed(currentBalance)}</Text>
                <Text style={{
                    ...Fonts.black13Medium,
                    marginBottom: Sizes.fixPadding * 3.0,
                    marginTop: Sizes.fixPadding - 5.0
                }}>{t("wallet:current_balance")}</Text>
            </View>
        )
    }

    const amountTextField = () => {
        return (
            <View style={{ paddingHorizontal: Sizes.fixPadding * 2.0,paddingTop: Sizes.fixPadding + 5.0, }}>
                <OutlineInput 
                    name="amount"
                    label={t("input:amount")}
                    keyboardType="decimal-pad"
                    multiline={true}
                    rules={{ 
                        required:t('validation:required',  {attribute :  t('input:amount')} ), 
                        pattern: {
                            value: /^\d+(\.\d+)?$/,
                            message: t('validation:numeric',  {attribute :  t('input:amount')} ), 
                        },
                        validate: (val) => {
                            if (parseFloat(val) > parseFloat(maxAmount) ) { 
                              return t('validation:gte_numeric',  {attribute :  t('input:amount'), value: maxAmount } )
                            }
                            if (parseFloat(val) < parseFloat(minAmount)) {
                                return t('validation:lte_numeric',  {attribute :  t('input:amount'), value: minAmount } )
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

    const onCheck = () => {
        setAgreeTerm(!agreeTerm)
        setSubmitBtnDisabled(!submitBtnDisabled)
    }

    const agreeWithTermsOfService = () =>{
        return (
            <View style={{ marginTop: Sizes.fixPadding, flexDirection: 'row', alignItems: 'center',  paddingHorizontal: Sizes.fixPadding * 2.0}}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => 
                        onCheck()
                    }
                    style={{
                        ...styles.checkBoxStyle,
                        backgroundColor: agreeTerm ? Colors.primaryColor : Colors.backColor,
                        borderColor: agreeTerm ? Colors.primaryColor : Colors.blackColor,
                    }}
                >
                    {
                        agreeTerm
                            ?
                            <Icon type="material" name="check" color={Colors.whiteColor} size={14} />
                            :
                            null
                    }
                </TouchableOpacity>
                <Text style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.black12Regular }}>
                    {t("wallet:stake_agree_term_info")}
                </Text>
            </View>
        )
    }

    const submitButton = () => {
        let btnStyle = (submitBtnDisabled) ? styles.disableButtonStyle : styles.continueButtonStyle;
        return (
            <CustomButton text={t('app:submit')}   style={btnStyle}  onPress={handleSubmit(onSubmit)} disabled={submitBtnDisabled} />
        )
    }

    return(
        <Background bgColor={Colors.backColor}>
            <View style={{ flex: 1 }}>
                {stackInfo()}
                {currentBalanceInfo()}
                {amountTextField()}
                {minMaxLimitInfo()}
                {agreeWithTermsOfService()}
                {submitButton()}
                <Loading visible={loading} />
                <SuccessMessageModal visible={isSucess} onClick={onNextClick} message={t("wallet:stake_success", {code : currencyCode,amount: toFixed(getValues("amount")) } )}/>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    containerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding * 2.0,
        borderColor: '#ECECEC',
        borderWidth: 1.0,
        elevation: 1.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
    },
    disableButtonStyle: {
        //flexDirection: 'row',
        backgroundColor: Colors.disabledColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5,
        borderColor:Colors.greyColor,
        //borderWidth:0.5
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5
    },
    checkBoxStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: Sizes.fixPadding - 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
    }
})

export default StackComponent;