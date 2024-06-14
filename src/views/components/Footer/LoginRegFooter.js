import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Styles
import BasicStyles from 'views/styles/BasicStyles';

// Icons
import CustomIcon from '../../components/CustomIcon';

export default class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateLogin = () => {
    this.props.navigation.navigate('Login');
  };

  navigateRegistration = () => {
    this.props.navigation.navigate('RegistrationOtpVerify');
  };

  render() {
    const {title} = this.props;
    const activeStyle = [
      styles.footerMenu,
      {borderBottomWidth: 2, borderBottomColor: '#fff'},
    ];
    const activeTextStyle = [{fontWeight: '700'}];
    return (
      <View style={[BasicStyles.directionRow, styles.footerComponent]}>
        <Pressable
          onPress={this.navigateLogin}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'Login' ? activeStyle : styles.footerMenu,
          ]}>
          <CustomIcon
            iconName={'login'}
            iconSize={20}
            iconColor={'#fff'}
            iconStyle={styles.footerIcon}
            iconType="Entypo"
          />

          <Text
            style={[
              BasicStyles.textSmall,
              BasicStyles.whiteColor,
              title === 'Login' ? activeTextStyle : null,
            ]}>
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={this.navigateRegistration}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'Registration' ? activeStyle : styles.footerMenu,
          ]}>
          <CustomIcon
            iconName={'add-user'}
            iconSize={20}
            iconColor={'#fff'}
            iconStyle={styles.footerIcon}
            iconType="Entypo"
          />

          <Text
            style={[
              BasicStyles.textSmall,
              BasicStyles.whiteColor,
              title === 'Registration' ? activeTextStyle : null,
            ]}>
            Registration
          </Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerComponent: {
    height: hp(7),
  },
  footerIcon: {
    height: wp(5),
    aspectRatio: 1 / 1,
  },
  footerMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#023C66',
  },
});
