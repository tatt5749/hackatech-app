import React from 'react';
import { StyleSheet, TextInput, View ,Text,Picker} from 'react-native';
import { Controller } from 'react-hook-form';
import colors from '../../../assets/theme/colors';
import DropDownPicker from 'react-native-dropdown-picker';


const CustomDropdownPicker = ({
    control,
    placeholder,
    name,
    rules={},
    label,
    listMode="SCROLLVIEW",
    open,
    inputValue,
    items,
    setOpen,
    setValue,
    setItems
}) => { 
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
                    
                        <DropDownPicker 
                            style={styles.input}
                            placeholder={placeholder}
                            open={open}
                            value={inputValue}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            listMode={listMode}
                            containerStyle={{
                                backgroundColor: error ? 'red' : '#e8e8e8'
                            }}
                            onChangeValue={onChange}
                        />
                   
                    {error && ( 
                        <Text style={{color:"red",alignSelf:"stretch" }}> {error.message || "Error" } </Text>
                    )}
                </>
            )}
        />
    )

}


const styles = StyleSheet.create({
     container : {
        backgroundColor : "white",
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

export default CustomDropdownPicker;