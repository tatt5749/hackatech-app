import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import { useForm,Controller } from 'react-hook-form';
import styles from "./styles";
import Container from "../../Common/Container";
import CustomButton from "../../Common/CustomButton/CustomButton";
import CustomPhoneNumber from "../../Common/CustomPhoneNumber";
import CustomPassword from "../../Common/CustomPassword";
import i18n,{t} from "../../../services";
import { Fonts, Colors, Sizes } from "../../../constants/Themes";
import Loading from "../../Common/Loading";

const PhoneLogin = ({
    loading,
    onSubmit,
    onForgotPasswordClick,
    onCreateAccountClick
}) => {
    const {control,handleSubmit,formState:{errors},setValue } = useForm();
   
    return (
       <Container>
            <View>
                <View style={styles.container}>
                    <CustomPhoneNumber 
                        phoneFieldContainerStyle={styles.phoneFieldContainerStyle} 
                        phoneTextContainerStyle={styles.phoneTextContainerStyle}
                        name='phone_number'
                        control={control}
                        rules={{ 
                            required:t('validation:required',  {attribute :  t('input:phone_number')} ), 
                        }}
                        errors={errors}
                        errorStyle={styles.errorContainerStyle}
                        setValue={setValue}
                        placeholderTextColor={Colors.blackColor}
                    />
                    <CustomPassword 
                        name='password'
                        placeholder={t('input:password')}  
                        control={control}
                        rules={{ 
                            required:t('validation:required',  {attribute :  t('input:password')} ), 
                        }}
                        secureTextEntry={true}
                        editable={true}
                        //errorMessage={error?.error?.password?.[0]}
                        placeholderTextColor={Colors.blackColor}
                        style={styles.passwordFieldContainerStyle}
                        errorStyle={styles.errorContainerStyle}
                        styleInput={{ ...Fonts.black16Medium, width: '90%' }}
                    />
                </View>
                <CustomButton text={t('app:continue')}   style={styles.continueButtonStyle}  onPress={handleSubmit(onSubmit)}/>  
            </View>
            <Loading visible={loading} />
       </Container>
    )
}


export default PhoneLogin;