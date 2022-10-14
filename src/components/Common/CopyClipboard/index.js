import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet,Dimensions,Modal,TouchableOpacity } from "react-native";
import Dialog from "react-native-dialog";
import * as Clipboard from 'expo-clipboard';
import Icon from '../Icon';
import { Colors,Sizes,Fonts } from '../../../constants/Themes';
import i18n,{t} from '../../../services';
import CustomModal from '../Modal';
const { width } = Dimensions.get('screen');

const CopyClipboard = ({
    copyString,
    modalMessage,
    iconStyle={},
    iconSize=15
}) => {
    const [copiedText, setCopiedText] = React.useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => { 
        if(showModal){
            setTimeout(() => {
                setShowModal(false)
            }, 1000)
        }
    },[showModal]);

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(copyString);
        setShowModal(true);
    };
    
    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setCopiedText(text);
    };

    return (
        <View>
            <TouchableOpacity onPress={copyToClipboard}>
                <Icon type="material" name="content-copy" size={iconSize} color={Colors.whiteColor} style={iconStyle}/>
            </TouchableOpacity>
            <CustomModal visible={showModal}>
                <View style={styles.successIconWrapStyle}>
                    <Icon type="material" name="done" size={40} color={Colors.primaryColor}/>
                </View>
                <Text style={{ ...Fonts.gray15Medium, paddingBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding * 2.0 }}>
                    {modalMessage}
                </Text>
            </CustomModal>
        </View>
    )
}

const styles = StyleSheet.create({
    successIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default CopyClipboard;
