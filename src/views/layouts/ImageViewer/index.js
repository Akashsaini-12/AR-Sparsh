/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// // import Gallery from 'react-native-image-gallery';
import BasicStyles from '../../styles/BasicStyles';

// Styles
// import BasicStyles from 'views/styles';

// Components

// Icons
import CustomIcon from '../../layouts/CustomIcon'

export default class ImageViewer extends Component {
  constructor(props) {
    super(props);
    this.theme = props.theme;
    this.state = {};
  }

  handleBack = () => {
    this.props.closePopup();
  };

  setViewRef = ref => {
    this.parentView = ref;
  };

  handleStartShouldSetResponder = event => {
    if (this.parentView._nativeTag === event.target._nativeTag) {
      this.props.closePopup();
    }
  };

  render() {
    const {imgData} = this.props;

    return (
      <View
        ref={this.setViewRef}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        style={styles(this.theme).mainContainer}>
        <View style={styles(this.theme).popupContainer}>
          {/* <Gallery
          style={{flex: 1, backgroundColor: 'black'}}
          images={[{source: {uri: imgData}}]}
        /> */}
          <Image
            source={{uri: imgData}}
            resizeMode="contain"
            style={[{flex: 1, height: this.theme.scale * 760}]}
          />
          <Pressable
            onPress={this.handleBack}
            style={({pressed}) => [
              {
                opacity: pressed ? 0.2 : 1.0,
                zIndex: 99,
              },
              styles(this.theme).crossContainer,
            ]}>
            <CustomIcon
              iconName={'cross'}
              iconSize={this.theme.scale * 35}
              iconColor={'#000'}
              iconType="Entypo"
            />
            {/* <Image
            source={ic_close}
            resizeMode="cover"
            style={styles(this.theme).iconStyle}
          /> */}
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.8)',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      zIndex: 15,
    },

    popupContainer: {
      // width: '100%',
      // marginTop: hp(-8),
      // backgroundColor: '#ffffff',
      borderRadius: theme.scale * 3,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },

    crossContainer: {
      position: 'absolute',
      right: theme.scale * 8,
      top: theme.scale * 8,
      backgroundColor: 'rgba(255,255,255,0.6)',
      borderRadius: theme.scale * 55,
    },
    iconStyle: {
      height: theme.scale * 15,
      aspectRatio: 1 / 1,
    },
  });
