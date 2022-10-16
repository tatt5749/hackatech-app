import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useForm,Controller } from 'react-hook-form';
import styles from "./styles";
import Container from "../../Common/Container";
import CustomButton from "../../Common/CustomButton/CustomButton";
import CustomInput from "../../Common/CustomInput/CustomInput";
import CustomPassword from "../../Common/CustomPassword";
import i18n,{t} from "../../../services";
import { Fonts, Colors, Sizes } from "../../../constants/Themes";
import Loading from "../../Common/Loading";

const EmailLogin = ({
    loading,
    onSubmit,
}) => {
    //const {control,handleSubmit,formState:{errors}} = useForm();
    const {control,handleSubmit,formState:{errors}} = useForm({
        defaultValues: {
            email: 'heck@hackatech.com',
            password: "Wailoon@5255"
        }
    });
    return (
        <Container>
            <View>
                <View style={styles.container}>
                    <CustomInput 
                        name='email'
                        placeholder={t('input:email')} 
                        control={control}
                        rules={{ 
                            required: t('validation:required',  {attribute :  t('input:email')} ), 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: t('validation:invalid_field',  {field :  t('input:email')} )
                            } 
                        }}
                        secureTextEntry={false}
                        editable={true}
                        keyboardType="email-address"
                        //errorMessage={error?.error?.email?.[0]}
                        placeholderTextColor={Colors.blackColor}
                        style={styles.textFieldContainerStyle}
                        styleInput={{ ...Fonts.black16Medium }}
                        errorStyle={styles.errorContainerStyle}
                        inputValue="heck@hackatech.com"
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
                        inputValue="Wailoon@5255"
                    />
                    
                </View>
                <CustomButton text={t('app:continue')} style={styles.continueButtonStyle}   onPress={handleSubmit(onSubmit)}/> 
               
            </View>
            <Loading visible={loading} />
        </Container>
    )
}

export default EmailLogin;