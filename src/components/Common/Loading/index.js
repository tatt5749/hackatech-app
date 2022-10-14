import React from 'react'
import { Text, View, StyleSheet,Dimensions,Modal } from "react-native";
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';
import { Fonts, Colors, Sizes} from '../../../constants/Themes'
import i18n,{t} from '../../../services';
import CustomModal from '../Modal';

const { width } = Dimensions.get('screen');
const Loading = ({
    children,
    title,
    visible=false
}) => {
    
    return (
        <View style={styles.container}>
            <Modal
                animationType="none"
                visible={visible}
                transparent={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <CircleFade size={48} color={Colors.primaryColor} />
                        <Text style={{ ...Fonts.gray15Medium, paddingBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding * 2.0 }}>
                            {t("app:please_wait")}
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
        // <Dialog.Container
        //     visible={visible}
        //     contentStyle={styles.dialogContainerStyle}
        //     headerStyle={styles.dialogHeaderStyle}
        // >
        //     <Dialog.Title>{title}</Dialog.Title>
        //     <View style={{ alignItems: 'center' }}>
        //         <CircleFade size={48} color={Colors.primaryColor} />
        //         <Text style={{ ...Fonts.gray15Medium, paddingBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding * 2.0 }}>
        //             {t("app:please_wait")}
        //         </Text>
        //     </View>
        // </Dialog.Container>
    );
  
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
    centeredView:{
        position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgba(100,100,100, 0.5)',
          padding: 20,
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    dialogHeaderStyle: {
        //backgroundColor: "#fff",
        // borderRadius: Sizes.fixPadding,
        // width: width - 90,
        // addingHorizontal: Sizes.fixPadding * 3.0,
        // paddingTop: Sizes.fixPadding,
        // paddingBottom: Sizes.fixPadding * 2.0,
    },
    dialogContainerStyle: {
        //backgroundColor: "#fff",
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        addingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
})

  
export default Loading;




