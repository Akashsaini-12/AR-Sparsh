/* eslint-disable curly */
import React from 'react';
import {View, Text} from 'react-native';

import Icon1 from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/Entypo';
import Icon4 from 'react-native-vector-icons/dist/Fontisto';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon6 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon7 from 'react-native-vector-icons/dist/Octicons';
import Icon8 from 'react-native-vector-icons/dist/FontAwesome5';
import Icon9 from 'react-native-vector-icons/dist/AntDesign';
import Icon10 from 'react-native-vector-icons/dist/Feather';

const index = props => {
  const {iconName, iconSize, iconStyle, iconColor, iconType} = props;

  let IconImg = Icon1;
  if (iconType === 'Ionicons') IconImg = Icon2;
  else if (iconType === 'Entypo') IconImg = Icon3;
  else if (iconType === 'Fontisto') IconImg = Icon4;
  else if (iconType === 'MaterialCommunityIcons') IconImg = Icon5;
  else if (iconType === 'MaterialIcons') IconImg = Icon6;
  else if (iconType === 'Octicons') IconImg = Icon7;
  else if (iconType === 'FontAwesome5') IconImg = Icon8;
  else if (iconType === 'AntDesign') IconImg = Icon9;
  else if (iconType === 'Feather') IconImg = Icon10;

  return (
    <IconImg
      name={iconName}
      size={iconSize}
      style={iconStyle}
      color={iconColor}
      solid
    />
  );
};

export default index;
