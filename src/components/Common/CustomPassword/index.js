import React from 'react';
import { StyleSheet, TextInput, View ,Text, Pressable} from 'react-native';
import { OutlinedTextField } from 'rn-material-ui-textfield';

import { Controller } from 'react-hook-form';
import { objectLength } from '../../../helpers/CommonFunction';
import { useTogglePasswordVisibility } from './useTogglePasswordVisibility';
import Icon from '../Icon';

const CustomPassword = ({
    control,
    name,
    rules={},
    style={},
    styleInput={},
    errorStyle={},
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    label,
    returnKeyType="done",
    editable,
    inputValue,
    onChangeText,
    errorMessage
}) => { 
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();
    return (
        <Controller 
            control={control}
            name={name}
            rules={rules}
            render={({field : {value,onChange,onBlur}, fieldState:{error} }) =>( 
                <>
                    {label && 
                        <View style={[styles.label]}>
                            <Text>{label}</Text>
                        </View>
                        
                    
                    }
                    <View style={[ 
                        objectLength(style) > 0  ? style : styles.container ,
                        {borderColor: error || errorMessage ? 'red' : '#e8e8e8' }
                    ]}>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                value={inputValue}
                                style={objectLength(styleInput) > 0  ? styleInput : styles.input }
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder={placeholder}
                                placeholderTextColor={placeholderTextColor}
                                secureTextEntry={passwordVisibility}
                                editable={editable}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType={returnKeyType}
                                autoCapitalize='none'
                                autoCorrect={false}
                            />
                            <Pressable onPress={handlePasswordVisibility}>
                                <Icon type="materialCommunity" name={rightIcon}  size={22} color='#232323'  />
                            </Pressable>
                        </View>
                    </View>
                    { error  && (
                        <Text 
                            style={[
                               { color:"red"},
                               { alignSelf:"stretch" },
                               errorStyle ,
                            ]}
                        > 
                            {error.message || "Error" } 
                        
                        </Text>
                    )}
                    { errorMessage    && (
                        <Text style={{color:"red",alignSelf:"stretch" }}> {errorMessage || "Error" } </Text>
                    )}
                </>

            )}
        />
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : "white",
        width : '100%',
        //height : '15%',
        borderColor : '#e8e8e8',
        borderWidth : 1,
        borderRadius : 5,
        paddingHorizontal : 10,
        marginVertical : 5,
    },
    inputContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        //borderWidth: 4,
        borderColor: '#d7d7d7'
    },
    input : {
        padding: 15,
        width: '90%'
    },
    label:{
        paddingVertical: 12,
    }
});

export default CustomPassword;