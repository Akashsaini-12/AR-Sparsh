import React from 'react';
import FastImage from 'react-native-fast-image';

const GifComponent = ({source, style, resizeMode = 'cover'}) => {
  return <FastImage source={source} style={style} resizeMode={resizeMode} />;
};

export default GifComponent;
