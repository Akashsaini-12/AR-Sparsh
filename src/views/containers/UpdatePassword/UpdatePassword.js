import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  showErrorToast,
  showMessageToast,
} from 'views/layouts/CustomToastMessage';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStyles from '../../styles/CustomStyles';
import Header from '../../layouts/Header';
import PullToRefresh from '../../components/PullToRefresh';
import {InputText} from '../../components/customComponent/InputText';
import CustomAresaComponent from '../../components/CustomFlatlisitComponent/CustomAresaComponent';
import {CustomButton} from '../../components/customComponent/CustomButton';
// Icons
export default class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      mobile: '',
      newPassword: '',
      oldPassword: '',
      confirmPassword: '',
    };
  }

  getmember_api_call = () => {};

  render() {
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title="UPDATE PASSWORD"
          theme={this.theme}
          navigation={this.props.navigation}
        />
        <PullToRefresh onRefresh={this.getmember_api_call}>
          <View style={styles(this.theme).mainContainer}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 1,
                  padding: this.theme.scale * 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 16,
                }}>
                <InputText
                  placeholder="Mobile No / Regimental No"
                  placeholderTextColor={this.theme.color.grayPrimary}
                  value={this.state.mobile}
                  onChangeText={e => [this.setState({mobile: e})]}
                  iconName="mobile1"
                  iconSize={25}
                  iconType="AntDesign"
                />
                <InputText
                  placeholder="Old Password"
                  placeholderTextColor={this.theme.color.grayPrimary}
                  value={this.state.oldPassword}
                  onChangeText={e => [this.setState({oldPassword: e})]}
                  iconName="eye"
                  iconSize={20}
                  iconType="FontAwesome"
                />
                <InputText
                  placeholder="New Password"
                  placeholderTextColor={this.theme.color.grayPrimary}
                  value={this.state.newPassword}
                  onChangeText={e => [this.setState({newPassword: e})]}
                  iconName="eye"
                  iconSize={20}
                  iconType="FontAwesome"
                />
                <InputText
                  placeholder="Confirm Password"
                  placeholderTextColor={this.theme.color.grayPrimary}
                  value={this.state.confirmPassword}
                  onChangeText={e => [this.setState({confirmPassword: e})]}
                  iconName="eye"
                  iconSize={20}
                  iconType="FontAwesome"
                />
                <CustomButton
                  title="Change Password"
                  btnContainerStyle={{
                    height: this.theme.scale * 45,
                    width: '98%',
                    borderRadius: this.theme.scale * 27,
                  }}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </PullToRefresh>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      padding: theme.scale * 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
      paddingTop: theme.scale * 20,
      padding: theme.scale * 10,
    },
  });
