import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View ,Text} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import IntlPhoneInput from 'react-native-intl-phone-input';
import PhoneInput, { isValidNumber } from "react-native-phone-number-input";
import { Fonts, Colors, Sizes } from "../../../constants/Themes";
import i18n,{t} from "../../../services";
import { objectLength,isNull } from "../../../helpers/CommonFunction";


const CustomPhoneNumber = ({
    control,
    errors,
    name,
    rules={},
    label,
    placeholder=t("input:phone_number"),
    placeholderTextColor,
    errorMessage,
    phoneFieldContainerStyle={},
    phoneTextContainerStyle={},
    defaultValue,
    errorStyle={},
    setValue,
    defaultCode="MY",
    isRequired=true
}) => {
    const PHONE_COUNTRY_CODE = "phone_country_code";
    const PHONE_PREFIX_CODE = "phone_prefix_code";
    const phoneInput = useRef();
    const [phoneNumber, setPhoneNumber] = useState(defaultValue);
    const [countryCode, setCountryCode] = useState('');
    const [phonePrefix, setPhonePrefix] = useState('');
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [inputErrMessage,setInputErrMessage] = useState('');
    
    const [initLoading,setInitLoading] = useState(true);

   

    const onChangePhoneNumber = (num) => {
        setPhoneNumber(num)
        setInitLoading(false);
    }


    useEffect(() => {  
        if(!isNull(errors[name])){  
            setInputErrMessage(errors[name].message);
        }
    }, [errors]);

    useEffect(() => { 
        if(!initLoading){
            
            let validPhoneNumber = isValidPhoneNumber();
           

            if(validPhoneNumber){  
                
                setInputErrMessage("");
            }

            if(!isNull(validPhoneNumber)){
                
                setInputErrMessage(validPhoneNumber);
            }
        }
        setValue(name,phoneNumber);
        setValue(PHONE_PREFIX_CODE,phonePrefix);
        setValue(PHONE_COUNTRY_CODE,countryCode);
    },[phoneNumber]);


    const isValidPhoneNumber = () =>{ 
        if(isRequired && isNull(phoneNumber)){
            return t('validation:required',  {attribute :  t('input:phone_number')} );
        }
        const checkValid = phoneInput.current?.isValidNumber(phoneNumber)
        if(!checkValid){
            return  t('validation:invalid_field',  {field :  t('input:phone_number')} );
        }
       
        return true;
    }

    const borderColor = () => {
        if((!isNull(inputErrMessage) && typeof inputErrMessage == 'string')){
            return Colors.redColor;
        }
        return Colors.grayColor;
    }

    

    return (
        <View>
            <Controller 
                control={control}
                name={name}
                rules={{
                    validate: (value) => isValidPhoneNumber(phoneNumber,validPhoneNumber)
                }}

                render={({field : {value,onChange,onBlur}, fieldState:{error} }) =>(  
                    <>
                        {label && 
                            <View style={[styles.label]}>
                                <Text>{label}</Text>
                            </View>
                        }
                        <View>
                            <PhoneInput
                                ref={phoneInput}
                                value={phoneNumber}
                                defaultCode={defaultCode}
                                layout="first"
                                onChangeText={(text) => {
                                    onChangePhoneNumber(text)
                                }}
                                onChangeFormattedText={(text) => {
                                    setFormattedPhoneNumber(text)
                                    setCountryCode(phoneInput.current?.getCountryCode() || '');
                                    setPhonePrefix(phoneInput.current?.getCallingCode() || '');
                                }}
                                containerStyle={[
                                    phoneFieldContainerStyle,
                                    {borderColor: borderColor() }
                                ]}
                                textContainerStyle={phoneTextContainerStyle}
                                textInputStyle={{ flex: 1 , ...Fonts.black16Medium}}
                                placeholder={placeholder}
                                textInputProps={{ 
                                    placeholderTextColor: placeholderTextColor,
                                    returnKeyType:"done",
                                    keyboardType:"number-pad"
                                }}
                                withDarkTheme
                                //autoFocus
                            />
                        </View>
                    </>
                )}
            />
            { (!isNull(inputErrMessage) && typeof inputErrMessage == 'string')  && (
                <Text 
                    style={[
                    { color:"red"},
                    { alignSelf:"stretch" },
                    errorStyle ,
                    ]}
                > 
                    {inputErrMessage || "Error" } 
                
                </Text>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    label:{
        paddingVertical: 12,
    },
    inputContainer: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        //paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        marginTop: Sizes.fixPadding * 2.0,
        height: 65.0,
        borderWidth : 1,
        borderColor : Colors.grayColor
        
    },
    phoneNumberContainerStyle: {
        //backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        //marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        height: 55.0,
        borderWidth: 0.3,
        borderColor: Colors.grayColor,
    },
    phoneInput: {
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 2,
        padding: 16
      },

});

export default CustomPhoneNumber;