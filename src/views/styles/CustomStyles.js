import {StyleSheet} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {horizontalScale, moderateScale, verticalScale} from './CustomMetrics';

const CustomStyles = theme =>
  StyleSheet.create({
    flexOne: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    logoTextColor: {
      fontSize: theme.scale * 35,
      marginTop: theme.scale * 10,
      color: '#204e79',
      fontWeight: '500',
    },
    mainHeading: {
      color: theme.color.textSecond,
      fontWeight: '700',
      fontSize: theme.scale * 25,
      marginTop: theme.scale * 10,
    },
    subHeading: {
      color: theme.color.textSecond,
      fontWeight: '400',
      fontSize: theme.scale * 22,
      marginTop: theme.scale * 20,
    },
    subHeadingSecond: {
      color: theme.color.textSecond,
      fontWeight: '400',
      fontSize: theme.scale * 14,
      marginBottom: theme.scale * 20,
      top: 6,
    },
    mainContainer: {
      flex: 1,
      paddingTop: theme.scale * 12,
      paddingHorizontal: theme.scale * 12,
    },
    mainContainerPrescription: {
      flex: 1,
      paddingTop: theme.scale * 20,
      // backgroundColor: '#fff',
      backgroundColor: '#1c6ba4',
      paddingHorizontal: theme.scale * 16,
    },
    backDropStyle: {
      flex: 1,
      paddingBottom: 18,
    },
    headingStyle: {
      fontSize: theme.scale * 20,
      marginTop: theme.scale * 1,
      fontWeight: '500',
      color: theme.color.primary,
    },
    textInputContainer: {
      // alignSelf: 'center',
      textAlign: 'center',
      height: theme.scale * 46,
      backgroundColor: theme.color.whitePrimary,
      width: '99%',
      borderRadius: theme.scale * 20,
      elevation: theme.scale * 5,
      padding: theme.scale * 10,
      marginTop: theme.scale * 20,
      // borderBottomWidth: theme.scale * 3,
      // borderBottomColor: theme.color.primary,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: theme.scale * 3},
      shadowOpacity: 0.1,
      shadowRadius: theme.scale * 3,
    },

    textInputContainerSignature: {
      alignSelf: 'center',
      height: theme.scale * 120,
      backgroundColor: theme.color.whitePrimary,
      width: '99%',
      borderRadius: theme.scale * 8,
      elevation: theme.scale * 5,
      padding: theme.scale * 10,
      marginTop: theme.scale * 20,
      borderBottomWidth: theme.scale * 3,
      borderBottomColor: theme.color.primary,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: theme.scale * 3},
      shadowOpacity: 0.1,
      shadowRadius: theme.scale * 3,
    },

    textInputLabel: {
      fontSize: theme.scale * 14,
      fontWeight: '600',
      color: theme.color.labelText,
    },

    textInputStyle: {
      fontSize: theme.scale * 14,
      color: theme.color.text,
      marginBottom: theme.scale * 5,
      marginLeft: theme.scale * -3,
    },
    dropdownBtnTxtStyle: {
      flex: 1, // Fill remaining space in the container
      fontSize: theme.scale * 14,
      color: theme.color.grayPrimary,
      // marginBottom: theme.scale * 5,
      // marginLeft: theme.scale * 2,
      // // marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    normalButtonContainer: {
      backgroundColor: theme.color.secondary,
      width: '95%',
      borderRadius: theme.scale * 7,
      marginTop: theme.scale * 45,
      alignSelf: 'center',
      flexDirection: 'row',
      padding: theme.scale * 18,
    },

    normalButtonText: {
      color: theme.color.primary,
      fontSize: theme.scale * 16,
      fontWeight: '700',
      flex: theme.scale * 1,
    },

    elevatedButtonContainer: {
      marginTop: theme.scale * 18,
      alignSelf: 'center',
      width: '99%',
      // height: wp(15),
      borderColor: '#f5e1e9',
      borderBottomWidth: theme.scale * 3,
      backgroundColor: theme.color.whitePrimary,
      borderRadius: theme.scale * 12,
      elevation: theme.scale * 3,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      // paddingHorizontal: 16,
      padding: theme.scale * 10,
    },
    skipButton: {
      marginTop: theme.scale * 18,
      alignSelf: 'flex-end',
      width: '99%',
      // height: wp(15),
      borderColor: '#f5e1e9',
      borderBottomWidth: theme.scale * 3,
      backgroundColor: theme.color.whitePrimary,
      borderRadius: theme.scale * 12,
      elevation: theme.scale * 3,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      // paddingHorizontal: 16,
      padding: theme.scale * 10,
    },

    elevatedButtonText: {
      flex: 1,
      fontSize: theme.scale * 14,
      fontWeight: '600',
      // marginTop: theme.scale * 4,
    },

    uTextInputContainer: {
      alignSelf: 'center',

      width: '95%',

      // elevation: 5,
      padding: theme.scale * 12,
      // marginVertical: hp(1),
    },

    uTextInputLabel: {
      fontSize: theme.scale * 16,
      fontWeight: '600',
      color: theme.color.primary,
    },

    uTextInputStyle: {
      height: theme.scale * 55,
      // marginTop: wp(2),
      borderBottomWidth: theme.scale * 2,
      borderColor: theme.color.primary,
      fontSize: theme.scale * 16,
      paddingLeft: theme.scale * 12,
      color: theme.color.blackPrimary,
      borderRadius: theme.scale * 4,
    },
    // customWidth100: {
    //   width: '99%',
    // },

    formButtonContainer: {
      marginTop: theme.scale * 18,
      marginBottom: theme.scale * 18,

      alignSelf: 'center',
      width: '99%',
      // height: wp(15),
      borderBottomWidth: theme.scale * 3,
      borderColor: theme.color.secondary,
      backgroundColor: theme.color.themeBlue,
      borderRadius: theme.scale * 12,
      elevation: theme.scale * 3,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      // paddingHorizontal: 16,
      padding: theme.scale * 10,
    },

    formButtonText: {
      flex: 1,
      fontSize: theme.scale * 14,
      fontWeight: '600',
      color: theme.color.whitePrimary,
      // marginTop: theme.scale * 4,
    },
    badgeIcon: {
      backgroundColor: theme.color.themeBlue,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.scale * 2,
      height: theme.scale * 25,
      aspectRatio: 1 / 1,
      borderRadius: theme.scale * 44,
      position: 'absolute',
      top: theme.scale * -15,
      right: theme.scale * -1,
    },
    badgeIconText: {
      color: theme.color.whitePrimary,
      fontSize: theme.scale * 13,
    },
  });

export default CustomStyles;
