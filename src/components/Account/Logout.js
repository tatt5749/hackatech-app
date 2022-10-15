import React, { useRef, useState } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import i18n,{t} from "../../services";
import Icon from "../Common/Icon";
import { Colors,Sizes,Fonts } from "../../constants/Themes";
import styles from "./styles";
import Dialog from "react-native-dialog";

const UserLogout=({
    onclick
}) => {
    const [showLogoutDialog , setShowLogoutDialog] = useState(false);
    //console.log(onclick);
    const logoutDialog = () => {
        return (
            <Dialog.Container visible={showLogoutDialog}
                contentStyle={styles.logoutDialogContainerStyle}
            >   
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <Text style={{ ...Fonts.black19Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        {t("account:logout_enquiry")}
                    </Text>
                    <View style={styles.cancelAndLogoutButtonContainerStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setShowLogoutDialog(false)}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.black16Medium }}>{ t("app:cancel") }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                setShowLogoutDialog(false)
                                {onclick()}
                                //this.props.navigation.push('SignIn')
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.white16Medium }}>{ t("account:logout") }</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </Dialog.Container>
        )
    }

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowLogoutDialog(true) }
                style={{
                    backgroundColor: Colors.whiteColor,
                    marginTop: Sizes.fixPadding,
                    marginBottom: Sizes.fixPadding * 3.0
                }}>
                <View style={styles.informationContainerStyle}>
                    <View style={styles.iconContainerStyle}>
                        <Icon type="materialCommunity"  name="login-variant" size={29} color="black" />
                    </View>
                    <Text style={{ ...Fonts.red17SemiBold, marginLeft: Sizes.fixPadding + 5.0, }}>
                        {t("account:logout")}
                    </Text>
                </View>
            </TouchableOpacity>
            {logoutDialog()}
        </View>
        
    )

}

export default UserLogout;