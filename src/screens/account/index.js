import React, { useContext,useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalContext } from "../../contexts/Provider";

import AccountComponent from "../../components/Account";
import logoutUser from "../../contexts/actions/Auth/LogoutUser";

const AccountScreen = ({}) => {
    const {navigate} = useNavigation();
   
    const {
        authDispatch,
        authState: {
            userInfo: {userData}
        },
    }  = useContext(GlobalContext);
   
    
    const logoutClick = () => { 
        logoutUser()(authDispatch);
       
    }

    return(
        <AccountComponent 
            userData={userData}
            logoutClick={logoutClick}
        />
    )
}

export default AccountScreen;