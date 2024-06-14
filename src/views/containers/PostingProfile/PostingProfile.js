import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStyles from '../../styles/CustomStyles';
import Header from '../../layouts/Header';
import PullToRefresh from '../../components/PullToRefresh';
import CustomRecordBranchComponent from '../../components/customComponent/CustomRecordBranchComponent';
export default class PostingProfile extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {};
  }

  Data = [
    {
      id: '1',
      unit: 'COMDT 2 WKSP AR',
      tos: '28-JUN-17',
      sos: 'NA',
      typeOfPosting: 'Posting In',
      remarks: 'HQ DGAR Letter No I 17015 80 Adm-I B 2017 36 D ',
    },
    {
      id: '2',
      unit: 'COMDT 2 WKSP AR',
      tos: '28-JUN-17',
      sos: 'NA',
      typeOfPosting: 'Posting In',
      remarks: 'HQ DGAR Letter No I 17015 80 Adm-I B 2017 36 D ',
    },
    {
      id: '3',
      unit: 'COMDT 2 WKSP AR',
      tos: '28-JUN-17',
      sos: 'NA',
      typeOfPosting: 'Posting In',
      remarks: 'NA ',
    },
  ];

  renderList = ({item}) => {
    return (
      <CustomRecordBranchComponent
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
          title="POSTING PROFILE"
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
    container2: {
      flex: 1,
      backgroundColor: theme.color.whitePrimary,
      elevation: 3,
      marginVertical: theme.scale * 8,
      marginHorizontal: theme.scale * 3,
      borderRadius: theme.scale * 6,
      borderWidth: 0.5,
      borderColor: theme.color.secondary,
    },
  });
