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
import CustomIcon from '../../layouts/CustomIcon';
import PullToRefresh from '../../components/PullToRefresh';

import CustomDocumentComponent from '../../components/customComponent/CustomDocumentComponent';
// Icons
export default class DocumentReqdClaims extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;

    this.state = {};
  }
  Data = [
    {id: '1', title: 'Natural Calamities Grant'},
    {id: '2', title: 'Funeral Grant'},
    {id: '3', title: 'Marriage Grant'},
    {id: '4', title: 'One Time Old Age  Grant'},
    {id: '5', title: 'Medical Grant'},
    {id: '6', title: 'School Education Grant'},
    {id: '7', title: 'Higher Education Grant'},
    {id: '8', title: 'Constant Attendant Allce'},
    {id: '9', title: 'Constant Attendant Allce'},
    {id: '10',title: 'Various Document Required'},
  ];
  renderList = ({item}) => {
    return (
      <CustomDocumentComponent
        item={item}
        navigation={this.props.navigation}
        theme={this.theme}
      />
    );
  };
  keyExtractor = item => item.id;
  getmember_api_call = () => {};

  render() {
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title=" DOCUMENTS REQD FOR VARIOUS CLAIMS"
          theme={this.theme}
          navigation={this.props.navigation}
        />
        <PullToRefresh onRefresh={this.getmember_api_call}>
          <View style={styles(this.theme).mainContainer}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <FlatList
                keyboardShouldPersistTaps={'handled'}
                data={this.Data}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderList}
              />
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
  });
