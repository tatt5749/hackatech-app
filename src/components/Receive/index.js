import React, { useContext, useEffect, useRef } from 'react';
import { BackHandler, SafeAreaView, View, StatusBar, Image, StyleSheet, Text,TouchableOpacity,FlatList  } from "react-native";
import { useForm,Controller } from 'react-hook-form';
import QRCode from 'react-native-qrcode-svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { Sizes,Fonts,Colors } from '../../constants/Themes';
import Background from '../Common/Background';
import Container from '../Common/Container';
import i18n,{t} from '../../services';
import CopyClipboard from '../Common/CopyClipboard';

const ReceiveComponent = ({
    walletAddress
}) =>{
   
    const qrCode = () => {
        return (
            <View style={{ alignItems: 'center', marginVertical: Sizes.fixPadding * 5.0 }}>
                <QRCode
                    value={walletAddress}
                    size={300}
                />
            </View>
        )
    }

    const addressTitle = () => {
        return (    
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.black15SemiBold }}>
                    {t("wallet:address")}
                </Text>
            </View>
        )
    }

    const walletAddressInfo = () => {
        return (
            <View style={styles.walletInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.white14Medium, flexShrink: 1 }}>
                        {walletAddress}
                    </Text>
                    <CopyClipboard 
                        copyString={walletAddress}
                        iconStyle={{ marginLeft: Sizes.fixPadding + 10.0, marginTop: -Sizes.fixPadding + 15.0   }}
                        iconSize={20}
                        modalMessage={t("wallet:copied_address")}
                    />
                </View>
            </View>
        )
    }

    return(
        <Background bgColor={Colors.backColor}>
            <Container style={{ flex: 1, justifyContent: 'center' }}>
                {qrCode()}
                {addressTitle()}
                {walletAddressInfo()}
            </Container>
        </Background>
    )
}

const styles = StyleSheet.create({
    walletInfoWrapStyle: {
        backgroundColor: "#808080",
        justifyContent: 'space-between',
        borderRadius: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        padding: Sizes.fixPadding + 5.0,
        
    },
})

export default ReceiveComponent;