import {StyleSheet} from 'react-native';
import { Fonts, Colors, Sizes   } from '../../constants/Themes';
import {
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
    imageVerifySignContainerStyle: {
        position: 'absolute',
        bottom: 5.0,
        right: 0.0,
        borderWidth: 2.0,
        borderColor: Colors.whiteColor,
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        alignItems: 'center'
    },
    logoutDialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelAndLogoutButtonContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding
    },
    logOutButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding
    },
    informationContainerStyle: {
        flexDirection: "row",
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding + 5.0,
        width: width - 40.0,
        alignSelf: 'center',
    },
    iconContainerStyle: {
        width: 30.0,
        height: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
})