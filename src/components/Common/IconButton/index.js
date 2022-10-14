import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const IconButton = ({title, onPress, icon}) => { 
    return(
        <TouchableOpacity  style={styles.button} onPress={onPress}>
            <Text>{title}</Text>
            {icon}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

});

export default IconButton