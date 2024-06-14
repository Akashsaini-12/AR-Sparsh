import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import downIcons from '../../../assets/images/downIcon.png';
const InfoDisseminatorComponent = props => {
  const {item, theme, navigation} = props;
  const {title, id} = item;
  const viewPdf = () => {
    navigation.navigate('ViewPdf');
  };
  return (
    <TouchableOpacity style={styles(theme).container} onPress={viewPdf}>
      <View style={styles(theme).upperContainer}>
        <Text style={styles(theme).showMore}>{id}</Text>
        <Text style={[styles(theme).nov2021]}>23 Nov 2021</Text>
      </View>
      <View style={styles(theme).downContainer}>
        <Text style={styles(theme).textTypo} numberOfLines={6}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet l uctus venenatis, lectus magna fringilla urna,
          porttitor rhoncus dolor purus non enim
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default InfoDisseminatorComponent;
const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.whitePrimary,
      elevation: 3,
      marginVertical: theme.scale * 8,
      marginHorizontal: theme.scale * 3,
      borderRadius: theme.scale * 6,
      borderWidth: 0.5,
      borderColor: theme.color.secondary,
    },
    showMoreDiv: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: theme.scale * 15,
    },
    textTypo: {
      color: theme.color.text,
      fontFamily: 'Manrope-Regular',
      fontSize: theme.scale * 15,
      overflow: 'hidden',
      paddingVertical: theme.scale * 10,
    },
    showMore: {
      fontFamily: 'Manrope-SemiBold',
      color: theme.color.text,
      fontSize: theme.scale * 14,
      fontWeight: '600',
    },
    downContainer: {
      //   padding: theme.scale * 12,
      paddingHorizontal: theme.scale * 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    upperContainer: {
      backgroundColor: '#faf0db',
      paddingVertical: theme.scale * 5,
      paddingHorizontal: theme.scale * 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    nov2021: {
      fontSize: theme.scale * 14,
      fontFamily: 'Manrope-Regular',
      color: theme.color.text,
    },
  });
