/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';

// Icons

import CustomIcon from 'views/layouts/CustomIcon';

const SpecializationComponent = props => {
  const {item} = props;
  const theme = props.theme;
  const {uploadedOn, _name, _description, fileSize} = item;

  const removeItem = () => {
    Alert.alert(
      'Remove!',
      'Are you sure you want to remove Specialization ' + _name,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: () => deleteItem()},
      ],
    );
  };
  const deleteItem = () => {
    props.removeItembyId(_name);
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
            iconName={'doctor'}
            iconSize={35}
            iconColor={'#175784'}
            iconStyle={styles.footerIcon}
            // iconType="Fontisto"
            iconType="MaterialCommunityIcons"
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: theme.scale * 15,
              fontWeight: '600',
              color: '#175784',
            }}>
            {_name}
          </Text>

          <Text
            style={{
              fontSize: theme.scale * 13,
              fontWeight: '300',
              color: '#333',
            }}>
            {' '}
            {_description}
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

      {/* <View
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
            iconName={'diagnoses'}
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
            }}></Text>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
          <CustomIcon
            iconName={'delete'}
            iconSize={25}
            iconColor={'#175784'}
            iconStyle={styles.footerIcon}
            iconType="MaterialCommunityIcons"
          />
        </TouchableOpacity>
      </View> */}
    </TouchableOpacity>
  );
};

export default SpecializationComponent;

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
