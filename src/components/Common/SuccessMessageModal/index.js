import React, { useState } from 'react'
import { Text, View, SafeAreaView, StatusBar, StyleSheet,Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import i18n,{t} from '../../../services';
import Icon from '../Icon';
import { Fonts, Colors, Sizes} from '../../../constants/Themes'
import CustomButton from '../CustomButton/CustomButton';

const SuccessMessageModal = ({ 
    children,
    isSuccess=false,
    title,
    message="",
    visible,
    onClick,
}) => { 
    //console.log("Modal =====>"+visible)
    //console.log(message)
    const [modalVisible, setModalVisible] = useState(visible);
    
    return (
        <Modal
            animationType="none"
            visible={visible}
        >
            <SafeAreaView style={styles.pageStyle} >
                <Text style={{ ...Fonts.black19SemiBold, marginTop: Sizes.fixPadding + 5.0 }}>
                    {t("app:success")}
                </Text>
                <View style={styles.successIconContainerStyle}>
                    <Icon type="ionicon" name="checkmark-sharp" size={50} color="white" />
                </View>
                <View>
                    <Text style={{
                        ...Fonts.gray15Medium,
                        textAlign: 'center',
                        marginHorizontal: Sizes.fixPadding * 2.0,
                        marginBottom: Sizes.fixPadding * 2.0
                    }}>
                        {message}
                    </Text>
                    <CustomButton text={t('app:confirm')}   style={styles.okButtonStyle} onPress={() => onClick()} />
                </View>
            </SafeAreaView>
        </Modal>
    );
}


const styles = StyleSheet.create({
    okButtonStyle: {
        backgroundColor: Colors.greenColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5,
    },
    successIconContainerStyle: {
        height: 150.0,
        width: 150.0,
        borderRadius: 75.0,
        alignItems: 'center',
        backgroundColor: Colors.greenColor,
        borderColor: '#A9C8AC',
        borderWidth: 15.0,
        justifyContent: 'center'
    },
    pageStyle: {
        flex: 1,
        backgroundColor: Colors.backColor,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default SuccessMessageModal;