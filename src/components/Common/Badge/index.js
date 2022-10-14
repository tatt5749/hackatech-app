import React from 'react';
import { View,StyleSheet } from 'react-native';

import {  Badge as BDG } from '@rneui/themed';

const Badge = ({style, value,status }) => {
    const badgeStatus = () => {
        let badge ='';
        switch(status.toUpperCase()) {
            case "COMPLETE":
                badge="success";
                break;
            case "REJECT":
            case "CANCEL":
                badge="error";
                break;
            case "EXPIRED":
                badge="warning";
                break;
        }
        return badge;
    }

    return(
        <View style={[styles.wrapper, style]}>
            <BDG value={value} status={badgeStatus()} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper : {
        
    }
})

export default Badge;