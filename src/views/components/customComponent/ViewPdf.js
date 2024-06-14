import { StyleSheet, Dimensions, View } from 'react-native';
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomStyles from '../../styles/CustomStyles';
import Header from '../../layouts/Header';
import PullToRefresh from '../../components/PullToRefresh';
import Pdf from 'react-native-pdf';
export default class ViewPdf extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {};
  }

  getmember_api_call = () => { };

  render() {
    const source = require('../../../assets/pdf/dummy.pdf');
    // for base64
    //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title="VIEW PDF"
          theme={this.theme}
          navigation={this.props.navigation}
        />
        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          enablePaging={true}
          enableSwipe={true}
          showsVerticalScrollIndicator={true}
          style={styles(this.theme).pdf}
        />
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      // flex: 1,
      //   padding: theme.scale * 12,
    },
    pdf: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
