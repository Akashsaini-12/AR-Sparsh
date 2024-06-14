
import React, {Component} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStyles from '../../styles/CustomStyles';
import Header from '../../layouts/Header';
import PullToRefresh from '../../components/PullToRefresh';

export default class AnnualArgisStatement extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {};
  }

  Data = [
    {id: '1', title: 'Item 1'},
    {id: '2', title: 'Item 2'},
    {id: '3', title: 'Item 3'},
  ];

  renderList = ({item}) => {
    return (
      <TouchableOpacity style={styles(this.theme).container2}>
        <View style={styles(this.theme).upperContainer}>
          <Text style={styles(this.theme).showMore}>Summary</Text>
        </View>
        <View style={styles(this.theme).downContainer}>
          <View style={styles(this.theme).summaryDiv}>
            <Text style={styles(this.theme).textTypo}>
              Opening Balance as on 1st of April 2022 :
            </Text>
            <Text style={styles(this.theme).textTypo}>243355</Text>
          </View>
          <View style={styles(this.theme).summaryDiv}>
            <Text style={styles(this.theme).textTypo}>Saving Distribution :</Text>
            <Text style={styles(this.theme).textTypo}>16804</Text>
          </View>
          <View style={styles(this.theme).summaryDiv}>
            <Text style={styles(this.theme).textTypo}>Interest :</Text>
            <Text style={styles(this.theme).textTypo}>17917</Text>
          </View>
          <View style={styles(this.theme).summaryDiv}>
            <Text style={styles(this.theme).textTypo}>
              Closing Balance as on 31st of March 2023:
            </Text>
            <Text style={styles(this.theme).textTypo}>278076</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = item => item.id;

  getmember_api_call = () => {};

  render() {
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title="ANNUAL ARGIS STATEMENTS"
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
    showMore: {
      fontFamily: 'Manrope-SemiBold',
      color: '#000000',
      fontSize: 14,
      fontWeight: '600',
    },
    downContainer: {
      paddingHorizontal: theme.scale * 8,
      paddingVertical: theme.scale * 8,
    },
    upperContainer: {
      backgroundColor: theme.color.cardBackground,
      paddingVertical: theme.scale * 5,
      paddingHorizontal: theme.scale * 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textTypo: {
      color: theme.color.blackPrimary,
      fontFamily: 'Manrope-Regular',
      fontSize: theme.scale * 15,
      overflow: 'hidden',
      paddingVertical: theme.scale * 3,
    },
    summaryDiv: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.scale * 2,
    },
  });

