
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDashboardBox from '../../components/CustomBox/CustomDashboardBox';
import CustomAresaComponent from '../../components/CustomFlatlisitComponent/CustomAresaComponent';
// Icons
export default class PaymentDetalisStatus extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {};
  }

  keyExtractor = item => item.id;
  getmember_api_call = () => {};
  render() {
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title="PAYMENT STATUS"
          theme={this.theme}
          navigation={this.props.navigation}
        />
        <PullToRefresh onRefresh={this.getmember_api_call}>
          <View style={styles(this.theme).mainContainer}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View style={styles(this.theme).noDataView}>
                <Text style={{fontSize: 16}}>No Data Available...</Text>
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
    noDataView: {
      alignItems: 'center',
      padding: theme.scale * 8,
      elevation: 1,
      backgroundColor: theme.color.whitePrimary,
    },
  });
