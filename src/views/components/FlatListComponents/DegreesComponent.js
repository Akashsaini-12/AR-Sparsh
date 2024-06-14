/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import ic_user from 'assets/icons/ic_user.png';
// Icons
import ImageViewer from 'views/layouts/ImageViewer';
import CustomIcon from 'views/layouts/CustomIcon';

const DegreesComponent = props => {
  const {item} = props;
  const theme = props.theme;
  const {
    uploadedOn,
    _type_id,
    _file,
    _details,
    _issue_date,
    fileName,
    fileSize,
  } = item;

  const removeItem = () => {
    Alert.alert(
      'Remove!',
      'Are you sure you want to remove Degree ' + _type_id,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => deleteItem()},
      ],
    );
  };
  const deleteItem = () => {
    props.removeItembyId(_details);
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
            Type: {_type_id}
          </Text>

          <Text
            style={{
              fontSize: theme.scale * 13,
              fontWeight: '300',
              color: '#175784',
            }}>
            Number: {_details}
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

      <View
        style={{
          // flex: 1,
          // backgroundColor: theme.color.secondary,
          backgroundColor: theme.color.secondary,
          borderBottomLeftRadius: 9,
          borderBottomRightRadius: 9,
          paddingVertical: 6,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomIcon
            iconName={'calendar-alt'}
            iconSize={20}
            iconColor={theme.color.primary}
            iconType="FontAwesome5"
          />
          <Text
            style={{
              fontSize: theme.scale * 12,
              fontWeight: '500',
              color: theme.color.text,
              marginLeft: theme.scale * 10,
            }}>
            {_issue_date}
          </Text>
        </View>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={removeItem}>
          <CustomIcon
            iconName={'delete'}
            iconSize={25}
            iconColor={'#175784'}
            iconStyle={styles.footerIcon}
            iconType="MaterialCommunityIcons"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default DegreesComponent;
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.whitePrimary,
      elevation: theme.scale * 3,
      marginVertical: theme.scale * 8,
      marginRight: theme.scale * 16,
      // paddingHorizontal: theme.scale * 16,
      // padding: theme.scale * 12,
      borderRadius: theme.scale * 6,
      height: '20%',
      width: '100%',
      borderWidth: 0.5,
      borderColor: theme.color.secondary,
    },
  });
