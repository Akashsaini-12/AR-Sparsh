import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomIcon from '../../layouts/CustomIcon';
const CustomGrievanceComponent = props => {
  const {item, theme, navigation} = props;

  const handleIssue = () => {
    console.log('GrievanceProgress');
    navigation.navigate('GrievanceProgress', {
      allDetail: item,
      theme: theme,
      navigation,
    });
  };

  return (
    <TouchableOpacity style={styles(theme).container} onPress={handleIssue}>
      <View style={styles(theme).titleContainer}>
        <Text style={[styles(theme).title, styles(theme).titleAbove]}>
          MOBILE APP ISSUE
        </Text>
      </View>
      <View style={styles(theme).downDiv}>
        <Text style={styles(theme).subtitle}>Testing View</Text>
        <View style={styles(theme).info}>
          <Text style={styles(theme).infoText}>3614</Text>
          <Text style={styles(theme).infoText}>Replied</Text>
          <Text style={styles(theme).infoText}>23 Nov 2021</Text>
        </View>
        <View style={styles(theme).row}>
          <Text style={styles(theme).handler}>APP ISSUE HANDLER</Text>
          <CustomIcon
            iconName={'eye'}
            iconSize={20}
            iconColor={theme.color.yellowPrimary}
            iconType={'FontAwesome'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.color.whitePrimary,
      flex: 1,
      marginVertical: theme.scale * 18,
      padding: theme.scale * 20,
      marginHorizontal: theme.scale * 5,
      borderRadius: theme.scale * 8,
      elevation: 3,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.scale * 8,
    },
    downDiv: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    },
    titleContainer: {
      marginBottom: theme.scale * 8,
    },
    title: {
      fontSize: theme.scale * 18,
      color: theme.scale.blackPrimary,
      fontWeight: '700',
    },
    titleAbove: {
      position: 'absolute',
      top: theme.scale * -30,
    },

    subtitle: {
      fontSize: theme.scale * 16,
      marginBottom: theme.scale * 12,
      color: theme.color.blackPrimary,
    },
    info: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoText: {
      fontSize: theme.scale * 14,
      color: theme.scale.blackPrimary,
    },

    handler: {
      fontSize: theme.scale * 14,
      fontWeight: 'bold',
      color: theme.scale.blackPrimary,
    },
  });

export default CustomGrievanceComponent;
