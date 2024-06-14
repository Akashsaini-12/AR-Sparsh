/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';

// Icons

import CustomIcon from 'views/layouts/CustomIcon';

const HospitalsCertificatesComponent = props => {
  const {item} = props;
  const theme = props.theme;
  const {
    uploadedOn,
    _cert_no,
    _file,
    _details,
    _issue_date,
    fileName,
    fileSize,
  } = item;

  const removeItem = () => {
    Alert.alert(
      'Remove!',
      'Are you sure you want to remove Certficate ' + _details,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => deleteItem()},
      ],
    );
  };
  const deleteItem = () => {
    props.removeItembyId(_cert_no);
  };
  return (
    <TouchableOpacity style={styles(theme).container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.scale * 8,
        }}>
        <View
          style={{
            padding: theme.scale * 8,
            marginRight: theme.scale * 8,
            borderRadius: theme.scale * 8,
          }}>
          <CustomIcon
            iconName={'file-pdf'}
            iconSize={35}
            iconColor={'#175784'}
            iconStyle={styles.footerIcon}
            iconType="FontAwesome5"
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: theme.scale * 15,
              fontWeight: '600',
              color: '#175784',
            }}>
            Type: {_details}
          </Text>

          <Text
            style={{
              fontSize: theme.scale * 13,
              fontWeight: '300',
              color: '#175784',
            }}>
            Number: {_cert_no}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.handleViewImg(_file);
          }}>
          <Image
            source={{uri: _file}}
            resizeMode="cover"
            style={{
              width: 70,
              height: 70,
              aspectRatio: 1 / 1,
              marginRight: theme.scale * 12,
            }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default HospitalsCertificatesComponent;
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.whitePrimary,
      elevation: theme.scale * 3,
      marginVertical: theme.scale * 8,
      // alignItems: 'center',
      alignSelf: 'center',
      // marginRight: theme.scale * 16,
      // paddingHorizontal: theme.scale * 16,
      // padding: theme.scale * 12,
      borderRadius: theme.scale * 6,
      height: '20%',
      width: Platform.OS === 'android' ? '105%' : '110%',
      borderWidth: 0.5,
      borderColor: theme.color.secondary,

      shadowOffset: {width: 0, height: theme.scale * 3},
      shadowOpacity: 0.1,
      shadowRadius: theme.scale * 3,
    },
  });
