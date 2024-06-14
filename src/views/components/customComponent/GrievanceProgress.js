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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStyles from '../../styles/CustomStyles';
import Header from '../../layouts/Header';
import PullToRefresh from '../../components/PullToRefresh';
import {CustomIcon} from '../../layouts/CustomIcon';

export default class GrievanceProgress extends Component {
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
          title="GRIEVANCE PROGRESS"
          theme={this.theme}
          navigation={this.props.navigation}
        />
        <PullToRefresh onRefresh={this.getmember_api_call}>
          <View style={styles(this.theme).mainContainer}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <TouchableOpacity style={styles(this.theme).container}>
                <View style={styles(this.theme).titleContainer}>
                  <Text
                    style={[
                      styles(this.theme).title,
                      styles(this.theme).titleAbove,
                    ]}>
                    APP ISSUE HANDLER
                  </Text>
                </View>
                <View style={styles(this.theme).downDiv}>
                  <Text style={styles(this.theme).subtitle}>Ok</Text>
                  <View style={styles(this.theme).info}>
                    <Text style={styles(this.theme).infoText}>3614</Text>
                    <Text style={styles(this.theme).infoText}>Replied</Text>
                    <Text style={styles(this.theme).infoText}>23 Nov 2021</Text>
                  </View>
                </View>
              </TouchableOpacity>
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
    container: {
      backgroundColor: theme.color.whitePrimary,
      flex: 1,
      marginVertical: theme.scale * 18,
      padding: theme.scale * 20,
      marginHorizontal: theme.scale * 5,
      borderRadius: theme.scale * 8,
      elevation: 3,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.scale * 8,
    },
    downDiv: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
    titleContainer: {
      marginBottom: theme.scale * 8,
    },
    title: {
      fontSize: theme.scale * 18,
      color: theme.scale.blackPrimary,
      fontWeight: '700',
    },
    titleAbove: {
      position: 'absolute',
      top: theme.scale * -30,
    },

    subtitle: {
      fontSize: theme.scale * 16,
      marginBottom: theme.scale * 12,
      color: theme.color.blackPrimary,
    },
    info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoText: {
      fontSize: theme.scale * 14,
      color: theme.scale.blackPrimary,
    },

    handler: {
      fontSize: theme.scale * 14,
      fontWeight: 'bold',
      color: theme.scale.blackPrimary,
    },
  });
