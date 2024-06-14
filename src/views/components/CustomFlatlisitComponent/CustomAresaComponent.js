import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import CustomIcon from '../../layouts/CustomIcon';
const CustomAresaComponent = props => {
  const {item, theme , navigation} = props;
  const {title, iconName, destination ,iconType} = item;

  const navigateToDetail = () => {
    // if (iconName != 'file-pdf-o') {
      props.navigation.navigate(destination, {
        allDetail: item,
        theme:theme,
        navigation
      });
    // }
  };

  return (
    <TouchableOpacity
      style={styles(theme).container}
      onPress={navigateToDetail}>
      <Text style={styles(theme).textTypo}>{title}</Text>
      <View>
        <CustomIcon
          iconName={iconName}
          iconSize={30}
          iconColor={theme.color.blackPrimary}
          iconType={iconType}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomAresaComponent;
const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.color.whitePrimary,
      borderRadius: theme.scale * 8,
      elevation: theme.scale * 3,
      marginVertical: theme.scale * 8,
      marginHorizontal: theme.scale * 2,
      padding: theme.scale * 8,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.scale * 15,
    },
    textTypo: {
      color: theme.color.blackPrimary,
      fontFamily: 'Manrope-Regular',
      fontSize: theme.scale * 15,
      overflow: 'hidden',
    },
  
  });
