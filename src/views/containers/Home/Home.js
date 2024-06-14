/* eslint-disable react-native/no-inline-styles */
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
import Toast from 'react-native-root-toast';
import PullToRefresh from '../../components/PullToRefresh';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDashboardBox from '../../components/CustomBox/CustomDashboardBox';
import {clearData }from '../../AsyncStorage'
// Icons
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {};
  }


  getmember_api_call = () => {};

  render() {
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title="DASHBOARD"
          theme={this.theme}
          navigation={this.props.navigation}
        />
        <PullToRefresh onRefresh={this.getmember_api_call}>
          <View style={styles(this.theme).mainContainer}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View style={styles(this.theme).row}>
                <CustomDashboardBox
                  title="INFO DISSEMINATOR"
                  iconName="infocirlceo"
                  iconType="AntDesign"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
                <CustomDashboardBox
                  title="ARESA"
                  iconName="person-outline"
                  iconType="Ionicons"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
                <CustomDashboardBox
                  title="ARGIS"
                  iconName="person-outline"
                  iconType="Ionicons"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
              </View>
              <View style={styles(this.theme).row}>
                <CustomDashboardBox
                  title="CPBO"
                  iconName="creditcard"
                  iconType="AntDesign"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
                <CustomDashboardBox
                  title="RECORD BRANCH"
                  iconName="list-outline"
                  iconType="Ionicons"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
                <CustomDashboardBox
                  title="PENSION/NE"
                  iconName="creditcard"
                  iconType="AntDesign"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
              </View>
              <View style={styles(this.theme).row}>
                <CustomDashboardBox
                  title="GPF"
                  iconName="creditcard"
                  iconType="AntDesign"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
                <CustomDashboardBox
                  title="NORMAL GRIEVANCE"
                  iconName="document-outline"
                  iconType="Ionicons"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
                <CustomDashboardBox
                  title="VIGILANCE GRIEVANCE"
                  iconName="document-outline"
                  iconType="Ionicons"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
              </View>
              <View style={styles(this.theme).row}>
                <CustomDashboardBox
                  title="DG GRIEVANCE"
                  iconName="document-outline"
                  iconType="Ionicons"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
                <CustomDashboardBox
                  title="CHANGE PASSWORD"
                  iconName="lock"
                  iconType="AntDesign"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
                <CustomDashboardBox
                  title="LINKS"
                  iconName="link"
                  iconType="AntDesign"
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
              </View>
            </KeyboardAwareScrollView>
          </View>
        </PullToRefresh>

        <Text style={{textAlign: 'center' ,bottom:10}}>SENTINELS OF THE NORTH EAST</Text>
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
