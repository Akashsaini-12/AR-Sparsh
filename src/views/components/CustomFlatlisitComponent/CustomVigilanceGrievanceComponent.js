import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
const CustomVigilanceGrievanceComponent = props => {
  const {item, theme, navigation} = props;
  const {title, details} = item;
  const handleIssue = () => {
    console.log('DgGrievanceProgress');
    navigation.navigate('DgGrievanceProgress', {
      allDetail: item,
      theme: theme,
      navigation,
    });
  };
  return (
    <TouchableOpacity style={styles(theme).container}>
      <View style={styles(theme).titleContainer}>
        <Text style={[styles(theme).title, styles(theme).titleAbove]}>
          {title}
        </Text>
      </View>

      <Text style={styles(theme).subtitle}>{details}</Text>
    </TouchableOpacity>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      marginVertical: theme.scale * 20,
      backgroundColor: '#fff',
      padding: theme.scale * 20,
      marginHorizontal: theme.scale * 5,
      borderRadius: theme.scale * 8,
      elevation: 3,
    },

    titleContainer: {
      position: 'relative',
      marginBottom: theme.scale * 8,
    },
    title: {
      fontSize: theme.scale * 16,
      color: theme.scale.blackPrimary,
      fontWeight: 'bold',
      width: '100%',
    },
    titleAbove: {
      position: 'absolute',
      top: theme.scale * -30,
      zIndex: 999,
    },

    subtitle: {
      fontSize: theme.scale * 16,
      color: 'black',
    },
  });

export default CustomVigilanceGrievanceComponent;
