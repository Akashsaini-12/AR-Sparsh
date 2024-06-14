/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
} from 'react-native';

import CustomIcon from '../../layouts/CustomIcon';
import {SDropDownPicker} from '../../components/customComponent/CustomDropDown';
import CustomStyles from '../../styles/CustomStyles';
import {InputText} from '../../components/customComponent/InputText';
import {FontFamily, FontSize} from '../../containers/GlobalStyles';
import CustomDocumentPicker from '../customComponent/CustomDocumentPicker';
import {
  CustomButton,
  SCustomButton,
} from '../../components/customComponent/CustomButton';
export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      grievance: '',
      complaintType: 'Type of Complaint',
      selectedPickerData: {
        Id: -1,
        Name: 'Type of Complaint',
        Value: 'Type of Complaint',
      },
    };
  }

  handleClosePopup = () => {
    this.setState({
      isShowGalleryPicker: false,
    });
  };
  handleGalleryPicker = () => {
    this.setState({isShowGalleryPicker: true});
  };

  render() {
    const {title, theme} = this.props;
    const activeStyle = [
      styles(theme).footerMenu,
      {borderBottomWidth: theme.scale * 3, borderBottomColor: '#1c6ba4'},
    ];
    const activeTextStyle = [{fontWeight: '700'}];
    return (
      <View style={styles(theme).footerIcon}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <View style={styles(theme).modalContainer}>
            <View style={styles(theme).modalContent}>
              <TouchableOpacity
                onPress={() => this.setState({modalVisible: false})}
                style={styles(theme).closeButtonContainer}>
                <View style={styles(theme).crossView}>
                  <CustomIcon
                    iconName={'cross'}
                    iconSize={24}
                    iconColor={'#000'}
                    iconType={'Entypo'}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={[
                    styles(theme).arSparshTypo,
                  ]}>{` Add New Grievance`}</Text>
                <SDropDownPicker
                  placeholder={this.state.complaintType}
                  selectedPickerData={this.state.selectedPickerData}
                  pickerData={[
                    {
                      Name: 'Welfare',
                      Value: 'Welfare',
                      Id: 1,
                    },
                    {
                      Name: 'Posting',
                      Value: 'Posting ',
                      Id: 2,
                    },
                    {
                      Name: 'Promotion/MACP',
                      Value: 'Promotion/MACP',
                      Id: 3,
                    },
                    {
                      Name: 'Pay and Allce',
                      Value: 'Pay and Allce',
                      Id: 4,
                    },
                    {
                      Name: 'Misc',
                      Value: 'Misc',
                      Id: 4,
                    },
                    {
                      Name: 'Mobile App Issue',
                      Value: 'Mobile App Issue',
                      Id: 4,
                    },
                  ]}
                  onChange={e => {
                    this.setState({
                      userType: e.Value.toString(),
                      selectedPickerData: e,
                    });
                  }}
                  containerStyle={[
                    CustomStyles(theme).textInputContainer,
                    CustomStyles(theme).customWidth100,
                  ]}
                  dropdownBtnTxtStyle={[
                    CustomStyles(theme).dropdownBtnTxtStyle,
                    {
                      marginLeft: 4,
                      zIndex:999
                    },
                  ]}
                  labelStyle={CustomStyles(theme).textInputLabel}
                />
                <InputText
                  placeholder="Enter Grievance"
                  placeholderTextColor="gray"
                  value={this.state.grievance}
                  onChangeText={e => [this.setState({grievance: e})]}
                  iconName=""
                  iconSize={20}
                  iconType="FontAwesome"
                />
                <TouchableOpacity
                  onPress={this.handleGalleryPicker}
                  style={[
                    {
                      marginVertical: theme.scale * 15,
                      backgroundColor: '#ffff',
                      padding: 8 * theme.scale,
                      borderRadius: 40 * theme.scale,
                      alignItems: 'center',
                      justifyContent: 'center',
                      elevation: 4 * theme.scale,
                      height: 46 * theme.scale,
                      zIndex:-1
                    },
                  ]}>
                  <CustomIcon
                    iconName={'upload'}
                    iconSize={25}
                    iconColor={'#f9be51'}
                    iconType="Entypo"
                  />
                </TouchableOpacity>

                <CustomButton
                  title="Submit"
                  btnContainerStyle={{
                    height: theme.scale * 45,
                    width: '99%',
                    zIndex:-1,
                    borderRadius: theme.scale * 27,
                  }}
                />
              </View>
            </View>
            {this.state.isShowGalleryPicker && (
              <CustomDocumentPicker
                theme={theme}
                closePopup={this.handleClosePopup}
                nav={this.props.navigation}
                handleDataUpdate={this.handleImgUpdate}
              />
            )}
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({

    
    footerMenu: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#dcedf9',
    },
  
    footerIcon: {
      marginTop: theme.scale * 80,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: theme.color.whitePrimary,
      paddingHorizontal: theme.scale * 20,
      borderTopLeftRadius: theme.scale * 20,
      borderTopRightRadius: theme.scale * 20,
      minHeight: '63%',
    },
    closeButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      bottom: theme.scale * 45,
    },
 

    crossView: {
      width: theme.scale * 35,
      height: theme.scale * 35,
      backgroundColor: '#ffff',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
    },
  });
