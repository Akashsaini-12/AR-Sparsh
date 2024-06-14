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
export default class DgGrievanceProgress extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.allDetail = props.route.params.allDetail;
    this.state = {};
  }
  getmember_api_call = () => {};
  render() {
    const {title, details} = this.allDetail;
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title=" DG GRIEVANCE PROGRESS"
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
                    {title}
                  </Text>
                </View>

                <Text style={styles(this.theme).subtitle}>Ok</Text>
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
      backgroundColor: '#fff',
      flex: 1,
      marginVertical: theme.scale * 20,
      backgroundColor: '#fff',
      padding: theme.scale * 20,
      marginHorizontal: theme.scale * 5,
      borderRadius: theme.scale * 8,
      elevation: 3,
    },

    titleContainer: {
      position: 'relative',
      marginBottom: theme.scale * 8,
    },
    title: {
      fontSize: theme.scale * 16,
      color: theme.scale.blackPrimary,
      fontWeight: 'bold',
      width: '100%',
    },
    titleAbove: {
      position: 'absolute',
      top: theme.scale * -30,
      zIndex: 999,
    },

    subtitle: {
      fontSize: theme.scale * 16,
      color: 'black',
    },
  });
