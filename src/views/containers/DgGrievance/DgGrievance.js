import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  Platform,
  Modal,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  showErrorToast,
  showMessageToast,
} from 'views/layouts/CustomToastMessage';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStyles from '../../styles/CustomStyles';
import Header from '../../layouts/Header';
import CustomIcon from '../../layouts/CustomIcon';
import PullToRefresh from '../../components/PullToRefresh';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDashboardBox from '../../components/CustomBox/CustomDashboardBox';
import CustomVigilanceGrievanceComponent from '../../components/CustomFlatlisitComponent/CustomVigilanceGrievanceComponent';
import CustomAresaComponent from '../../components/CustomFlatlisitComponent/CustomAresaComponent';
import CustomDocumentPicker from '../../components/customComponent/CustomDocumentPicker';
import {SDropDownPicker} from '../../components/customComponent/CustomDropDown';
import {InputText} from '../../components/customComponent/InputText';
import {CustomButton} from '../../components/customComponent/CustomButton';
import {FontFamily, fontSize, Color} from '../GlobalStyles';
// Icons
export default class DgGrievance extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    // const {isViewProfile: response} = this.props;
    this.state = {
      modalVisible: false,
      grievance: '',
      complaintType: 'Type of Complaint',
      selectedPickerData: {
        Id: -1,
        Name: 'Type of Complaint',
        Value: 'Type of Complaint',
      },
      uploadDocument: '',
    };
  }
  Data = [
    {
      id: '1',
      title: 'NO GRIEVANCE FOUND',
      details: 'You Have Not Submited Any Grievance Yet !',
    },
    {
      id: '2',
      title: 'NO GRIEVANCE FOUND',
      details: 'You Have Not Submited Any Grievance Yet !',
    },
    {
      id: '3',
      title: 'NO GRIEVANCE FOUND',
      details: 'You Have Not Submited Any Grievance Yet !',
    },
  ];
  renderList = ({item}) => {
    return (
      <CustomVigilanceGrievanceComponent
        item={item}
        navigation={this.props.navigation}
        theme={this.theme}
      />
    );
  };
  handleClosePopup = () => {
    this.setState({
      isShowGalleryPicker: false,
    });
  };

  handleClosePopup = () => {
    this.setState({
      isShowGalleryPicker: false,
    });
  };

  handleImgUpdate = (res, imgName) => {
    const imageSizeInKB = Math.round(res.length / 1024);
    if (imageSizeInKB > 500) {
      Alert.alert(
        'Image Size Exceeded',
        'Please choose a smaller image. Images must be 500 KB or smaller.',
      );

      return;
    }

    // Continue with the image handling if the size is within limits
    this.setState({uploadDocument: res, imgName});
    // this.setState({uploadDocument: 'heeekk'});
  };
  handleGalleryPicker = () => {
    this.setState({isShowGalleryPicker: true});
  };
  handleAdd = () => {
    this.setState({modalVisible: true});
  };
  keyExtractor = item => item.id;
  getmember_api_call = () => {};

  render() {
    const {uploadDocument} = this.state;
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title="DG GRIEVANCE"
          theme={this.theme}
          navigation={this.props.navigation}
        />
        <PullToRefresh onRefresh={this.getmember_api_call}>
          <View style={styles(this.theme).mainContainer}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <FlatList
                keyboardShouldPersistTaps={'handled'}
                data={this.Data}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderList}
              />
            </KeyboardAwareScrollView>
          </View>
        </PullToRefresh>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <View style={styles(this.theme).modalContainer}>
            <View style={styles(this.theme).modalContent}>
              <TouchableOpacity
                onPress={() => this.setState({modalVisible: false})}
                style={styles(this.theme).closeButtonContainer}>
                <View style={styles(this.theme).crossView}>
                  <CustomIcon
                    iconName={'cross'}
                    iconSize={24}
                    iconColor={this.theme.color.blackPrimary}
                    iconType={'Entypo'}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginHorizontal: 16,
                }}>
                <Text
                  style={[
                    styles(this.theme).arSparshTypo,
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
                    CustomStyles(this.theme).textInputContainer,
                    CustomStyles(this.theme).customWidth100,
                  ]}
                  dropdownBtnTxtStyle={[
                    CustomStyles(this.theme).dropdownBtnTxtStyle,
                    {
                      marginLeft: 4,
                      zIndex: 999,
                    },
                  ]}
                  labelStyle={CustomStyles(this.theme).textInputLabel}
                />
                <InputText
                  placeholder="Enter Grievance"
                  placeholderTextColor="gray"
                  value={this.state.grievance}
                  onChangeText={e => [this.setState({grievance: e})]}
                  iconName="message-square"
                  iconSize={20}
                  iconType="Feather"
                />
                <TouchableOpacity
                  onPress={this.handleGalleryPicker}
                  style={[
                    {
                      marginVertical: this.theme.scale * 15,
                      backgroundColor: this.theme.color.whitePrimary,
                      padding: 8 * this.theme.scale,
                      borderRadius: 40 * this.theme.scale,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      elevation: 4 * this.theme.scale,
                      height: 46 * this.theme.scale,

                      zIndex: -1,
                    },
                  ]}>
                  <Text style={styles(this.theme).textInputStyle}>
                    {uploadDocument == ''
                      ? 'Upload Document'
                      : ' Document Uploaded Successfully'}
                  </Text>
                  <View style={{marginRight: this.theme.scale * 10}}>
                    <CustomIcon
                      // iconName={'upload'}
                      iconName={
                        uploadDocument == '' ? 'upload' : 'checkcircleo'
                      }
                      iconSize={20}
                      iconColor={this.theme.color.yellowPrimary}
                      iconType={uploadDocument == '' ? 'Entypo' : 'AntDesign'}
                    />
                  </View>
                </TouchableOpacity>
                <CustomButton
                  title="Submit"
                  btnContainerStyle={{
                    height: this.theme.scale * 45,
                    width: '99%',
                    zIndex: -1,
                    borderRadius: this.theme.scale * 27,
                  }}
                />
              </View>
            </View>
            {this.state.isShowGalleryPicker && (
              <CustomDocumentPicker
                theme={this.theme}
                closePopup={this.handleClosePopup}
                nav={this.props.navigation}
                handleDataUpdate={this.handleImgUpdate}
              />
            )}
          </View>
        </Modal>
        <TouchableOpacity
          style={styles(this.theme).addIcon}
          onPress={this.handleAdd}>
          <CustomIcon
            iconName={'plus'}
            iconSize={this.theme.scale * 38}
            iconColor={this.theme.color.whitePrimary}
            iconType="Entypo"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      padding: theme.scale * 12,
    },

    addIcon: {
      display: 'flex',
      height: theme.scale * 60,
      width: theme.scale * 60,
      backgroundColor: '#f9ba45',
      borderRadius: theme.scale * 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: theme.scale * 25,
      bottom: theme.scale * 50,
      zIndex: 999,
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
      backgroundColor: theme.color.whitePrimary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
    },
    arSparshTypo: {
      color: theme.color.blackPrimary,
      fontFamily: FontFamily.sansation,
      fontSize: theme.scale * 21,
      textAlign: 'center',
    },
    textInputStyle: {
      flex: 1,
      fontSize: theme.scale * 14,
      color: theme.color.grayPrimary,
      paddingHorizontal: 10,
      // marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
  });
