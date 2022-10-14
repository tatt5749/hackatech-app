import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar } from "react-native";
import { Colors,Fonts } from "../../constants/Themes";
import { appName } from "../../configs/config";
import { CircleFade } from 'react-native-animated-spinkit';
import Router from "../../Router";

class SplashScreen extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Text style={{ ...Fonts.white40Bold }}>
                        {appName}
                    </Text> */}
                    <CircleFade size={70} color={Colors.whiteColor}
                        style={{ position: 'absolute', bottom: 50.0 }}
                    />
                </View>
            </SafeAreaView> 
        )
    }
}

SplashScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default SplashScreen;