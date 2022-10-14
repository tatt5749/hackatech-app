import React, {useContext, useEffect} from 'react';
import { GlobalContext } from '../../contexts/Provider';
import {useNavigation, useRoute} from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import logoutUser from '../../contexts/actions/Auth/LogoutUser';
import i18n,{t} from '../../services';
import alert from '../../components/Common/Alert';


const LogoutScreen = () => {
    const {navigate, setOptions} = useNavigation();
    const {authDispatch} = useContext(GlobalContext);
    const {params} = useRoute();

    let msg =  t("app:token_expired");
    let title = t("app:error"); 
    
    if (params?.msg) {
        msg = params.msg;
      }
  
    if (params?.title) {
        title = params.title;
    }

    useEffect(() => { 
        alert(title, msg, [
          {
              text: t("app:confirm"),
              onPress: () => {
                logoutUser()(authDispatch);
              },
          },
        ])
    }, []);

    return <ActivityIndicator />;
}

export default LogoutScreen;