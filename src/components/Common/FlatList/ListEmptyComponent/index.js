import React from 'react';
import { View,StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../../../../assets/theme/colors';
import Message from '../../Message/Index';
const ListEmptyComponent = ({loading,style}) => { 
    return (
        <>
            {!loading && (
                <View style={{paddingVertical:100,paddingHorizontal:100}}>
                    <Message info message="No Loans to show"></Message>
                </View>
            )}
        </>
        
    );
}

const styles = StyleSheet.create({
    wrapper : {
    }
})

export default ListEmptyComponent;