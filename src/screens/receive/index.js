import React, { useContext,useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalContext } from "../../contexts/Provider";

import ReceiveComponent from "../../components/Receive";
import { tabHeader } from "../../helpers/CommonFunction";
import i18n,{t} from "../../services";

const ReceiveScreen = ({navigation }) => {

    const {navigate, setOptions} = useNavigation();
    const {
        authState: {
            userInfo: {userData}
        },
    }  = useContext(GlobalContext);

    useEffect(() => {
        setOptions(tabHeader(t("wallet:scan_to_receive")));
    }, []);

    


    return (
        <ReceiveComponent 
            walletAddress={userData.user_info?.wallet_address}
        />
    )
}

export default ReceiveScreen;