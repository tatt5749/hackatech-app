import React, { useState } from 'react'
import { Text, View, SafeAreaView, StatusBar, StyleSheet,Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import i18n,{t} from '../../../services';
import Icon from '../Icon';
import { Fonts, Colors, Sizes} from '../../../constants/Themes'
import CustomButton from '../CustomButton/CustomButton';

const ErrorMessageModal = ({ 
    children,
    title,
    message="sddd",
    visible=false,
    onClick,
}) => { 
    const [showModal,setShowModal] = useState(visible);

    return (
        <Modal
            animationType="slide"
            visible={showModal}
        >
            <SafeAreaView style={styles.pageStyle} >
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <Text style={{ ...Fonts.black19SemiBold, marginTop: Sizes.fixPadding + 5.0 }}>
                    {t("app:success")}
                </Text>
                <View style={styles.wrongIconContainerStyle}>
                    <Icon type="ionicon" name="close-sharp" size={50} color="white" />
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
                    <CustomButton text={t('app:confirm')}  style={styles.okButtonStyle} onPress={() => setShowModal(false)} />
                </View>
            </SafeAreaView>
        </Modal>
    );
}


const styles = StyleSheet.create({
    okButtonStyle: {
        backgroundColor: Colors.redColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5,
    },
    wrongIconContainerStyle: {
        height: 150.0,
        width: 150.0,
        borderRadius: 75.0,
        alignItems: 'center',
        backgroundColor: Colors.redColor,
        borderColor: '#F6AAAC',
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

export default ErrorMessageModal;