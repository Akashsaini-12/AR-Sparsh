
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
  } from 'react-native';
  import React from 'react';
  const LeaveDetailsComponent = props => {
    const {item, theme} = props;
    const {id, typeOfLeave, fromDate, toDate, totalDays} = item;
  
    return (
      <TouchableOpacity style={styles(theme).container2}>
        <View style={styles(theme).upperContainer}>
          <Text style={styles(theme).showMore}>{id}</Text>
        </View>
        <View style={styles(theme).downContainer}>
         
          <View style={styles(theme).summaryDiv}>
            <Text style={styles(theme).textTypo}>Type Of Leave :</Text>
            <Text style={styles(theme).textTypo}>{typeOfLeave}</Text>
          </View>
          <View style={styles(theme).summaryDiv}>
            <Text style={styles(theme).textTypo}>From Date :</Text>
            <Text style={styles(theme).textTypo}>{fromDate}</Text>
          </View>
          <View style={styles(theme).summaryDiv}>
            <Text style={styles(theme).textTypo}>To Date :</Text>
            <Text style={styles(theme).textTypo}>{toDate}</Text>
          </View>
          <View style={styles(theme).summaryDiv}>
            <Text style={styles(theme).textTypo}>Total Days :</Text>
            <Text style={styles(theme).textTypo}>{totalDays}</Text>
          </View>
        </View>
       
      </TouchableOpacity>
    );
  };
  
  export default LeaveDetailsComponent;
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
        borderWidth: 0.5,
        borderColor: theme.color.secondary,
      },
      showMore: {
        fontFamily: 'Manrope-SemiBold',
        color: theme.color.blackPrimary,
        fontSize: 14,
        fontWeight: '600',
      },
      downContainer: {
        paddingHorizontal: theme.scale * 8,
        paddingVertical: theme.scale * 8,
      },
      upperContainer: {
        backgroundColor: theme.color.cardBackground,
        paddingHorizontal: theme.scale * 8,
        paddingVertical: theme.scale * 5,
     
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
  