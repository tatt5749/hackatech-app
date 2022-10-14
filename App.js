import React ,{useState}from 'react';

import { I18nManager as RNI18nManager,LogBox } from 'react-native';
import Router from './src/Router'
import i18n,{t} from './src/services';
import * as Font from "expo-font";
import SplashScreen from './src/screens/SplashScreen';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
])


export default class App extends React.Component {
  state = {
    langLoaded : false
  };

    componentDidMount() { 
      
        i18n.init()
            .then(() => {
                const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';

                // RN doesn't always correctly identify native
                // locale direction, so we force it here.
                if (i18n.dir !== RNDir) {
                    const isLocaleRTL = i18n.dir === 'RTL';

                    RNI18nManager.forceRTL(isLocaleRTL);

                    // RN won't set the layout direction if we
                    // don't restart the app's JavaScript.
                    Updates.reloadFromCache();
                }
                
            })
            .catch((error) => console.log('ERR')); 
            this.setState({ langLoaded: true });
  }



  render() {
    if (!this.state.langLoaded) { 
      return (<SplashScreen />);
    }
    return <Router/>;
  }
}