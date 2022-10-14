import React from 'react'
import { Text, View, StyleSheet,Dimensions,Modal } from "react-native";
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';
import { Fonts, Colors, Sizes} from '../../../constants/Themes'
import i18n,{t} from '../../../services';
import { objectLength } from '../../../helpers/CommonFunction'

const { width } = Dimensions.get('screen');

const CustomModal = ({
    children,
    text,
    visible=false,
    modalStyles={},
}) => {
    return (
        <View style={styles.container}>
            <Modal
                animationType="none"
                visible={visible}
                transparent={true}
            >
                <View style={styles.centeredView}>
                    <View 
                        style={[ 
                            objectLength(modalStyles) > 0  ? modalStyles : styles.modalView
                        ]}
                    >
                        {children}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 22,
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
})

  
export default CustomModal;




