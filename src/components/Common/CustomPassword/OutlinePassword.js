import React from 'react';
import { StyleSheet, TextInput, View ,Text, Pressable} from 'react-native';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import { Controller } from 'react-hook-form';
import { objectLength } from '../../../helpers/CommonFunction';
import { useTogglePasswordVisibility } from './useTogglePasswordVisibility';
import Icon from '../Icon';
import { Colors,Fonts,Sizes } from '../../../constants/Themes';

const OutlinePassword = ({
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
                    <View style={[ 
                        {borderColor: error || errorMessage ? 'red' : '#e8e8e8' }
                    ]}>
                        <View >
                            <OutlinedTextField
                                label={label}
                                labelTextStyle={{ ...Fonts.black15Medium }}
                                style={[
                                    { ...Fonts.black15SemiBold, },
                                    
                                ]}
                                containerStyle={[
                                    styles.inputContainer,
                                    {borderColor: error || errorMessage ? 'red' : '#e8e8e8' }
                                ]}
                                inputContainerStyle={
                                    styles.input
                                }
                                renderRightAccessory={() => <Pressable onPress={handlePasswordVisibility}>
                                    <Icon type="materialCommunity" name={rightIcon}  size={22} color='#232323'  />
                                </Pressable>}
                                value={value}
                                onChangeText={onChange}
                                placeholderTextColor={placeholderTextColor}
                                secureTextEntry={passwordVisibility}
                                editable={editable}
                                enablesReturnKeyAutomatically={true}
                                returnKeyType={returnKeyType}
                                autoCapitalize='none'
                                autoCorrect={false}
                                errorColor="red"
                                error={error?.message || errorMessage  || "" } 
                            />
                            
                        </View>
                    </View>
       
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
        //backgroundColor: 'white',
        width: '100%',
        // borderRadius: 5,
        // flexDirection: 'row',
        // alignItems: 'center',
        //borderWidth: 4,
        //borderColor: '#d7d7d7'
    },
    input : {
        //padding: 15,
        width: '100%'
    },
    label:{
        paddingVertical: 12,
    }
});

export default OutlinePassword;