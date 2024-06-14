/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DocsTimeListComponent = props => {
  const {item, theme, selectedTimeSlotId} = props;

  const {id, status} = item;

  const isSelected = id === selectedTimeSlotId;

  return (
    <View
      style={[
        styles(theme).container,
        {
          backgroundColor:
            status !== 0
              ? theme.color.textThird
              : isSelected
              ? theme.color.primary
              : theme.color.whitePrimary,
        },
      ]}>
      <Text
        style={{
          color: isSelected
            ? theme.color.whitePrimary
            : theme.color.blackPrimary,
          fontWeight: '600',
          fontSize: theme.scale * 12,
          textAlign: 'center',
        }}>
        {item.time}
      </Text>
    </View>
  );
};

export default DocsTimeListComponent;

const styles = theme =>
  StyleSheet.create({
    container: {
      minWidth: '31%',
      margin: theme.scale * 3.5,
      padding: theme.scale * 12,
      backgroundColor: theme.color.whitePrimary,
      borderRadius: theme.scale * 35,
    },
  });
