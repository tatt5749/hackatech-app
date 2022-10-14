import {StyleSheet} from 'react-native';
import { Fonts, Colors, Sizes  } from '../../../constants/Themes';

export default StyleSheet.create({
    container: {
        //flexDirection: 'row',
        //justifyContent: 'space-between',
        backgroundColor: 'white',
        elevation: 2.0,
        //borderRadius: Sizes.fixPadding * 2.0,
        //alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
      
    },

    textFieldContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        marginTop: Sizes.fixPadding * 2.0,
        //borderColor:"red",
        borderWidth : 1,
    },
    errorContainerStyle: {
        marginHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        marginBottom: 0.5,
        //borderRadius: Sizes.fixPadding,
        //elevation: 1.0,
        //marginTop: Sizes.fixPadding 
    },
    passwordFieldContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        marginTop: Sizes.fixPadding * 2.0,
        borderWidth : 1,
    },
    phoneFieldContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        width: '88%',
        borderWidth : 1,
        //borderColor : Colors.grayColor,
        marginTop: Sizes.fixPadding * 2.0, 
    },
    phoneTextContainerStyle:{
        borderColor : Colors.grayColor ,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        elevation: 1.0,
    },
    phoneNumberContainerStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        elevation: 1.0,
        height: 55.0,
    },
    forgotPassword: {
        width: '95%',
        alignItems: 'flex-end',
        marginBottom: 10,
        marginTop: 10,
    },
    forgot: {
        fontSize: 13,
        color: Colors.secondaryColor,
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5,
    },
    createAccountButtonStyle: {
        //flexDirection: 'row',
        backgroundColor: Colors.successColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5,
        marginBottom: Sizes.fixPadding *2.5,
    },
})