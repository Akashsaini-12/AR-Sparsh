import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
const CustomRecordBranchComponent = props => {
  const {item, theme} = props;
  const {id, unit, tos, sos, typeOfPosting, remarks} = item;

  return (
    <TouchableOpacity style={styles(theme).container2}>
      <View style={styles(theme).downContainer}>
        <View style={styles(theme).summaryDiv}>
          <Text style={styles(theme).textTypo}>S No :</Text>
          <Text style={styles(theme).textTypo}>{id}</Text>
        </View>
        <View style={styles(theme).summaryDiv}>
          <Text style={styles(theme).textTypo}>Unit :</Text>
          <Text style={styles(theme).textTypo}>{unit}</Text>
        </View>
        <View style={styles(theme).summaryDiv}>
          <Text style={styles(theme).textTypo}>TOS :</Text>
          <Text style={styles(theme).textTypo}>{tos}</Text>
        </View>
        <View style={styles(theme).summaryDiv}>
          <Text style={styles(theme).textTypo}>SOS :</Text>
          <Text style={styles(theme).textTypo}>{sos}</Text>
        </View>
        <View style={styles(theme).summaryDiv}>
          <Text style={styles(theme).textTypo}>Type of Posting :</Text>
          <Text style={styles(theme).textTypo}>{typeOfPosting}</Text>
        </View>
      </View>
      <View style={[styles(theme).upperContainer]}>
        <Text style={[styles(theme).showMore]}>{remarks}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomRecordBranchComponent;
const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      padding: theme.scale * 12,
    },
    container2: {
      flex: 1,
      backgroundColor: theme.color.whitePrimary,
      elevation: 3,
      marginVertical: theme.scale * 8,
      marginHorizontal: theme.scale * 3,
      borderRadius: theme.scale * 6,
      borderWidth: theme.scale * 0.5,
      borderColor: theme.color.secondary,
    },
    showMore: {
      fontFamily: 'Manrope-SemiBold',
      color: theme.color.blackPrimary,
      fontSize: theme.scale * 14,
      fontWeight: '600',
    },
    downContainer: {
      paddingHorizontal: theme.scale * 8,
      paddingVertical: theme.scale * 8,
    },
    upperContainer: {
      backgroundColor: '#faf0db',
      paddingHorizontal: theme.scale * 8,
      paddingVertical: theme.scale * 7,
    },
    textTypo: {
      color: theme.color.blackPrimary,
      fontFamily: 'Manrope-Regular',
      fontSize: theme.scale * 15,
      overflow: 'hidden',
      paddingVertical: theme.scale * 3,
    },
    summaryDiv: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.scale * 0,
    },
  });
