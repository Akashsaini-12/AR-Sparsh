import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';

const CustomDocumentComponent = props => {
  const {item, theme} = props;
  const {title, id} = item;

  const navigateToDetail = () => {
    // props.navigation.navigate('DocumentReqdClaims', {
    //   allDetail: item,
    // });
  };

  return (
    <TouchableOpacity
      style={styles(theme).container}
      onPress={navigateToDetail}>
      <View style={styles(theme).textContainer}>
        <Text style={styles(theme).idText}>{id}</Text>
        <Text style={styles(theme).titleText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomDocumentComponent;

const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.color.whitePrimary,
      borderRadius: theme.scale * 8,
      elevation: theme.scale * 3,
      marginVertical: theme.scale * 8,
      marginHorizontal: theme.scale * 2,
      padding: theme.scale * 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    idText: {
      color: theme.color.blackPrimary,
      fontFamily: 'Manrope-Regular',
      fontSize: theme.scale * 15,
      flex: 0.5, 
    },
    titleText: {
      color: theme.color.blackPrimary,
      fontFamily: 'Manrope-Regular',
      fontSize: theme.scale * 15,
      flex: 1, 
      
    },
  });
