import React, { useContext, useEffect, useRef } from 'react';
import { BackHandler, SafeAreaView, View, StatusBar, Image, StyleSheet, Text,TouchableOpacity,FlatList  } from "react-native";
import { useForm,Controller } from 'react-hook-form';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Background from '../Common/Background';
import { Colors,Fonts,Sizes } from '../../constants/Themes';

const UnstackComponent = ({}) =>{
    return(
        <Background bgColor={Colors.backColor}>
            <View style={{ flex: 1 }}></View>
        </Background>
    )
}

const styles = StyleSheet.create({
   
})

export default UnstackComponent;