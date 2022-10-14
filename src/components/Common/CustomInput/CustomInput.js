import React from 'react';
import { StyleSheet, TextInput, View ,Text} from 'react-native';
import { Controller } from 'react-hook-form';
import { objectLength } from '../../../helpers/CommonFunction';
import { Fonts, Colors, Sizes } from '../../../constants/Themes';

const CustomInput = ({
    control,
    name,
    rules={},
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    label,
    keyboardType,
    returnKeyType="done",
    style={},
    styleInput={},
    errorStyle={},
    editable,
    inputValue,
    onChangeText,
    errorMessage,
    defaultValue
}) => {  
    return (
        <Controller  
            control={control}
            name={name}
            rules={rules}
            defaultValue={defaultValue}
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
                        <TextInput 
                            value={value}
                            style={objectLength(styleInput) > 0  ? styleInput : styles.input }
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            placeholderTextColor={placeholderTextColor}
                            secureTextEntry={secureTextEntry}
                            keyboardType={keyboardType}
                            editable={editable}
                            enablesReturnKeyAutomatically={true}
                            returnKeyType={returnKeyType}
                        />
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
                        <Text 
                            style={[
                                {color:"red",alignSelf:"stretch", },
                                errorStyle ,
                            ]}
                        > 
                            {errorMessage || "Error" } 
                        </Text>
                    )}
                </>

            )}
        />
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : Colors.whiteColor,
        width : '100%',
        //height : '15%',
        borderColor : '#e8e8e8',
        borderWidth : 1,
        borderRadius : 5,
        paddingHorizontal : 10,
        marginVertical : 5,
    },
    
    input : {
        padding:15,
    },
    label:{
        paddingVertical: 12,
    }
});

export default CustomInput;