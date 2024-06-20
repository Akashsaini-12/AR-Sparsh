// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Platform,
//   TextInput,
//   KeyboardAvoidingView,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import React, {Component} from 'react';
// import {Icon} from 'react-native-elements';
// import CustomStyles from '../../styles/CustomStyles';
// import PullToRefresh from '../../components/PullToRefresh';
// import ic_recording from '../../../assets/icons/ic_recording.gif';
// import ic_recording_mic from '../../../assets/icons/ic_recording_mic.png';
// import ic_pause_buttton from '../../../assets/icons/ic_pause_buttton.png';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImageViewer from '../../layouts/ImageViewer';
// import ImagePicker from 'react-native-image-picker';
// import CustomIcon from '../../layouts/CustomIcon';

// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   AudioEncoderAndroidType,
//   AudioSourceAndroidType,
//   OutputFormatAndroidType,
// } from 'react-native-audio-recorder-player';

// import {
//   check,
//   request,
//   openSettings,
//   PERMISSIONS,
//   RESULTS,
// } from 'react-native-permissions';

// // import {RNFetchBlobFetchPolyfill} from 'rn-fetch-blob';
// import RNFetchBlob from 'rn-fetch-blob';
// import RNFS, {copyFile} from 'react-native-fs';
// import Header from '../../layouts/Header';
// import CustomDocumentPicker from '../../components/customComponent/CustomDocumentPicker';
// export default class Chatgpt extends Component {
//   constructor(props) {
//     super(props);
//     this.theme = props.route.params.theme;
//     this.state = {
//       input: '',
//       plusToggle: true,
//       messages: [],
//       imageData: '',
//       isRecordStart: false,
//       loading: false,
//       isRecordpaused: false,
//       isLoggingIn: false,
//       recordSecs: 0,
//       recordTime: '00:00:00',
//       currentPositionSec: 0,
//       currentDurationSec: 0,
//       playTime: '00:00:00',
//       duration: '00:00:00',
//       imageData: '',
//       newAudioData: '',
//       documentData: [],
//       imageUri: '',
//       imagebasecamera: '',
//       selectedImgData: '',
//       selectedImgId: '',
//       isLoading: false,
//       showModal: false,
//       response: null,
//       recIcon: ic_recording_mic,
//       recText: '',
//       uploadDocument: '',
//     };
//     this.audioRecorderPlayer = new AudioRecorderPlayer();
//     this.audioRecorderPlayer.setSubscriptionDuration(0.09);
//   }

//   requestPermission = async permission => {
//     try {
//       const platformPermission = Platform.select({
//         android: permission,
//         ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//       });

//       const result = await check(platformPermission);

//       switch (result) {
//         case RESULTS.DENIED:
//           const requestResult = await request(platformPermission);
//           switch (requestResult) {
//             case RESULTS.GRANTED:
//               return RESULTS.GRANTED;
//           }
//           break;
//         case RESULTS.GRANTED:
//           return RESULTS.GRANTED;
//         case RESULTS.BLOCKED:
//           Alert.alert(
//             'Permission Blocked',
//             'Press OK and provide permission in App Setting',
//             [
//               {
//                 text: 'Cancel',
//                 style: 'cancel',
//               },
//               {
//                 text: 'OK',
//                 onPress: this.handleOpenSettings,
//               },
//             ],
//             {cancelable: false},
//           );
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   onStartRecord = async () => {
//     const granted = await this.requestPermission(
//       PERMISSIONS.ANDROID.RECORD_AUDIO,
//     );
//     console.log(granted, 'granted');
//     if (granted !== 'granted') {
//       return;
//     }

//     // const path =
//     //   Platform.OS === 'android'
//     //     ? `${RNFetchBlob.fs.dirs.CacheDir}/response.mp3`
//     //     : 'hello.m4a';

//     const path =
//       Platform.OS === 'android'
//         ? `${RNFetchBlob.fs.dirs.CacheDir}/response.mp3`
//         : 'hello.m4a';
//     console.log('Recording path:', path);

//     const audioSet = {
//       AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//       AudioSourceAndroid: AudioSourceAndroidType.MIC,
//       AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//       AVNumberOfChannelsKeyIOS: 2,
//       AVFormatIDKeyIOS: AVEncodingOption.aac,
//       OutputFormatAndroid: OutputFormatAndroidType.DEFAULT,
//     };

//     const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
//     console.log('URI ::::', uri);
//     this.setState({
//       isRecordStart: true,
//       recIcon: ic_recording,
//     });

//     this.audioRecorderPlayer.addRecordBackListener(e => {
//       console.log('Record time', e);
//       this.setState({
//         recordSecs: e.currentPosition,
//         recordTime: this.audioRecorderPlayer.mmssss(
//           Math.floor(e.currentPosition),
//         ),
//       });
//     });
//   };
//   convertAudioToBase64 = async (filePath, mimeType) => {
//     try {
//       // Read the audio file
//       const fileData = await RNFS.readFile(filePath, 'base64');
//       console.log(fileData);

//       const base64Data = await RNFetchBlob.fs
//         .readFile(filePath, 'base64')
//         .catch(error => {
//           console.error(error);
//         });
//       return fileData;
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   onStopRecord = async () => {
//     this.setState({
//       isRecordStart: true,
//       recIcon: ic_recording_mic,
//       loading: true,
//     });
//     const result = await this.audioRecorderPlayer.stopRecorder();
//     console.log(result);
//     this.audioRecorderPlayer.removeRecordBackListener();
//     this.setState({
//       recordSecs: 0,
//     });

//     let resp = await this.uriToBlob(result);
//     console.log('resprespresprespresp', resp);

//     let imageData = {...resp.data, uri: result};

//     const filePath = imageData.uri;
//     console.log('filePathfilePath', filePath);
//     const mimeType = imageData.type;
//     console.log('mimeTypemimeType', mimeType);

//     const base64String = await this.convertAudioToBase64(filePath, mimeType);
//     console.log('base64String', base64String);

//     this.props.closePopup();
//     this.props.handleImgUpdate('audio', imageData);
//   };

//   onPauseRecord = async () => {
//     try {
//       const r = await this.audioRecorderPlayer.pauseRecorder();
//       this.setState({
//         isRecordpaused: true,
//         recIcon: ic_pause_buttton,
//       });
//       console.log(r);
//     } catch (err) {
//       console.log('pauseRecord', err);
//     }
//   };

//   onResumeRecord = async () => {
//     try {
//       await this.audioRecorderPlayer.resumeRecorder();
//       this.setState({
//         isRecordpaused: false,
//         recIcon: ic_recording,
//       });
//     } catch (err) {
//       console.log('Resume Recorder', err);
//     }
//   };

//   onCancelRecord = async () => {
//     this.setState({isRecordStart: false});
//     await this.audioRecorderPlayer.stopRecorder();
//     this.audioRecorderPlayer.removeRecordBackListener();
//     // this.props.closePopup();
//     this.setState({
//       recordSecs: 0,
//     });
//   };

//   onStartPlay = async e => {
//     console.log('onStartPlay');
//     //const path = 'hello.m4a'
//     const {newAudioData} = this.state;

//     const msg = await this.audioRecorderPlayer.startPlayer(
//       JSON.parse(newAudioData).uri,
//     );
//     this.audioRecorderPlayer.setVolume(1.0);
//     console.log(msg);
//     this.audioRecorderPlayer.addPlayBackListener(e => {
//       if (e.current_position === e.duration) {
//         console.log('finished');
//         this.audioRecorderPlayer.stopPlayer();
//       }
//       this.setState({
//         currentPositionSec: e.current_position,
//         currentDurationSec: e.duration,
//         playTime: this.audioRecorderPlayer.mmssss(
//           Math.floor(e.current_position),
//         ),
//         duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
//       });
//     });
//   };
//   onPausePlay = async e => {
//     await this.audioRecorderPlayer.pausePlayer();
//   };

//   onStopPlay = async e => {
//     console.log('onStopPlay');
//     this.audioRecorderPlayer.stopPlayer();
//     this.audioRecorderPlayer.removePlayBackListener();
//   };

//   uriToBlob = uri => {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();

//       xhr.onload = function () {
//         resolve(xhr.response);
//       };

//       xhr.onerror = function () {
//         reject(new Error('uriToBlob failed'));
//       };
//       xhr.responseType = 'blob';
//       xhr.open('GET', uri, true);
//       xhr.send(null);
//     });
//   };

//   handleCameraImage = async () => {
//     try {
//       let permissionStatus = null;

//       if (Platform.OS === 'android') {
//         permissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
//       } else if (Platform.OS === 'ios') {
//         permissionStatus = await request(PERMISSIONS.IOS.CAMERA);
//       }

//       if (permissionStatus !== 'granted') {
//         Alert.alert(
//           'Permission Required',
//           'Please grant camera permission to use this feature.',
//           [
//             {
//               text: 'OK',
//               onPress: () => console.log('Permission denied'),
//             },
//           ],
//         );
//         return;
//       }

//       const option = {
//         skipBackup: true,
//         includeBase64: true,
//         mediaType: 'photo',
//         quality: 0.2,
//         cameraType: 'back',
//       };

//       const response = await launchCamera(option);

//       if (!response.assets || response.assets.length === 0) {
//         console.log('No assets returned from camera');
//         return;
//       }

//       let newData = null;
//       let imageData = null;

//       if (Platform.OS === 'android') {
//         newData = response.assets[0];
//         imageData = {
//           size: newData.fileSize,
//           type: newData.type,
//           name: newData.fileName,
//           fileCopyUri: newData.uri,
//           uri: newData.uri,
//         };
//       } else if (Platform.OS === 'ios') {
//         newData = response.assets[0];
//         const {fileName, fileSize, type, uri} = newData;
//         let imgName = fileName;

//         if (typeof fileName === 'undefined') {
//           // on iOS, using camera returns undefined fileName. This fixes that issue, so API can work.
//           var getFilename = uri.split('/');
//           imgName = getFilename[getFilename.length - 1];
//         }

//         imageData = {
//           size: fileSize,
//           type: type,
//           name: imgName,
//           fileCopyUri: uri,
//           uri: uri,
//         };
//       }
//       this.setState({imageData, imageUri: newData.uri});
//       console.log(imageData, 'imageData');
//       this.convertAudioToBase64(imageData.uri, imageData.type).then(data => {
//         this.setState({imagebasecamera: data});
//         this.setState({plusToggle: true});
//         console.log(data, 'data');
//         // this.making_api_call();
//       });
//     } catch (error) {
//       console.log('Error while handling camera image:', error);
//     }
//   };

//   convertAudioToBase64 = async (filePath, mimeType) => {
//     try {
//       const base64Data = await RNFetchBlob.fs
//         .readFile(filePath, 'base64')
//         .catch(error => {
//           console.error(error);
//         });
//       return base64Data;
//       // return `data:${mimeType};base64,${base64Data}`;
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // uploadmage?

//   handleClosePopup = () => {
//     this.setState({
//       isShowGalleryPicker: false,
//     });
//   };

//   handleImgUpdate = (res, imgName) => {
//     const imageSizeInKB = Math.round(res.length / 1024);
//     if (imageSizeInKB > 500) {
//       Alert.alert(
//         'Image Size Exceeded',
//         'Please choose a smaller image. Images must be 500 KB or smaller.',
//       );

//       return;
//     }

//     // Continue with the image handling if the size is within limits

//     const result = res.split(',')[1];
//     console.log(result, 'imgName');
//     this.setState({imagebasecamera: result, imgName});
//     this.setState({plusToggle: true});
//     // this.setState({uploadDocument: 'heeekk'});
//   };

//   handleGalleryPicker = () => {
//     this.setState({isShowGalleryPicker: true});
//   };

//   toggleSwitch = () => {
//     this.setState(prevState => ({
//       plusToggle: !prevState.plusToggle,
//     }));
//   };

//   handleMessage = text => {
//     this.setState({input: text});
//     if (text !== '0') {
//       this.setState({plusToggle: true});
//     }
//   };
//   onFocusInput = () => {
//     this.setState({plusToggle: true});
//   };

//   sendMessage = () => {
//     const {input, messages, imagebasecamera} = this.state;
//     console.log(imagebasecamera.length ,'imagebasecamera')
//     if (input.trim().length > 0) {
//       const newMessage = {
//         id: (messages.length + 1).toString(),
//         user: 'User',
//         message: input,
//         photo: imagebasecamera,
//       };
//       this.setState(prevState => ({
//         messages: [newMessage, ...prevState.messages],
//         input: '',
//       }));
//       this.setState({imagebasecamera: ''});

//       setTimeout(() => {
//         const chatGptResponse = {
//           id: (this.state.messages.length + 1).toString(),
//           user: 'ECHS',
//           message: 'This is a response from ChatGPT.',
//         };
//         this.setState(prevState => ({
//           messages: [chatGptResponse, ...prevState.messages],
//         }));
//       }, 1000);
//     }
//   };
//   closeImage = () => {
//     this.setState({imagebasecamera: ''});
//   };
//   renderMessage = ({item}) => {
//     const isChatGPT = item.user === 'ECHS';
//     const uploadDocument = item.photo;
//     return (
//       <View
//         style={
//           isChatGPT
//             ? styles(this.theme).chatGPTContainer
//             : styles(this.theme).userContainer
//         }>
//         {!isChatGPT && uploadDocument !== '' ? (
//           <Image
//             source={{uri: `data:image/png;base64,${uploadDocument}`}}
//             resizeMode="cover"
//             style={{
//               height: this.theme.scale * 200,
//               width: this.theme.scale * 80,
//               aspectRatio: 1 / 1,
//               borderRadius: 12,
//             }}
//           />
//         ) : null}
//         <Text style={styles(this.theme).username}>{item.user}</Text>
//         <Text style={styles(this.theme).message}>{item.message}</Text>
//       </View>
//     );
//   };

//   getmember_api_call = () => {};

//   render() {
//     const {isRecordStart, isRecordpaused, loading, imagebasecamera} =
//       this.state;
//     const {input, plusToggle} = this.state;
//     return (
//       <View style={CustomStyles(this.theme).container}>
//         <View style={styles(this.theme).header}>
//           <TouchableOpacity>
//             <Icon name="menu" size={24} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles(this.theme).headerTitle}>ECHS</Text>
//           <TouchableOpacity onPress={() => {}}>
//             <Icon name="more-vert" size={24} color="#000" />
//           </TouchableOpacity>
//         </View>

//         <KeyboardAvoidingView
//           style={styles(this.theme).flexContainer}
//           behavior={Platform.OS === 'ios' ? 'padding' : null}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
//           <View style={styles(this.theme).messagesContainer}>
//             <FlatList
//               data={this.state.messages}
//               keyExtractor={item => item.id}
//               renderItem={this.renderMessage}
//               inverted
//             />
//           </View>
//         </KeyboardAvoidingView>

//         <View style={styles(this.theme).inputRow}>
//           {plusToggle ? (
//             <TouchableOpacity
//               style={styles(this.theme).iconLeftContainer}
//               onPress={this.toggleSwitch}>
//               <Icon name="plus" type="feather" size={24} color="#4F4F4F" />
//             </TouchableOpacity>
//           ) : (
//             <>
//               <TouchableOpacity
//                 onPress={
//                   Platform.OS === 'android'
//                     ? this.handleCameraImage
//                     : this.handleCameraImage
//                 }>
//                 <Icon name="camera" type="feather" size={24} color="#4F4F4F" />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{marginLeft: 10}}
//                 onPress={this.handleGalleryPicker}>
//                 <Icon name="file" type="feather" size={24} color="#4F4F4F" />
//               </TouchableOpacity>
//             </>
//           )}
//           <View
//             style={[
//               styles(this.theme).inputContainer,
//               {
//                 borderRadius:
//                   imagebasecamera == '' ? this.theme.scale * 50 : 12,
//               },
//             ]}>
//             {imagebasecamera !== '' ? (
//               <>
//                 <TouchableOpacity
//                   style={styles(this.theme).crossView}
//                   onPress={this.closeImage}>
//                   <CustomIcon
//                     iconName={'cross'}
//                     iconSize={18}
//                     iconColor={this.theme.color.blackPrimary}
//                     iconType={'Entypo'}
//                   />
//                 </TouchableOpacity>
//                 <Image
//                   source={{uri: `data:image/png;base64,${imagebasecamera}`}}
//                   resizeMode="cover"
//                   style={{
//                     height: 100,
//                     width: 80,
//                     aspectRatio: 1 / 1,
//                     borderRadius: 12,
//                   }}
//                 />
//               </>
//             ) : null}

//             <View
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 flexDirection: 'row',
//               }}>
//               <TextInput
//                 style={styles(this.theme).input}
//                 placeholder={isRecordStart ? '' : 'Message'}
//                 value={input}
//                 onFocus={this.onFocusInput}
//                 onChangeText={this.handleMessage}
//                 multiline={true}
//                 numberOfLines={4}
//               />
//               {input.length === 0 && (
//                 <>
//                   <TouchableOpacity
//                     disabled={this.state.loading}
//                     onPress={
//                       isRecordStart
//                         ? isRecordpaused
//                           ? this.onResumeRecord
//                           : this.onPauseRecord
//                         : this.onStartRecord
//                     }>
//                     <Icon
//                       name={isRecordpaused ? 'mic-off' : 'mic'}
//                       type="feather"
//                       size={24}
//                       color="#4F4F4F"
//                     />
//                   </TouchableOpacity>
//                   {isRecordStart && (
//                     <Text style={styles(this.theme).recTextStyle}>
//                       {this.state.recText}
//                     </Text>
//                   )}
//                   {isRecordStart && (
//                     <Text style={styles(this.theme).recTextStyle}>
//                       {this.state.recordTime}
//                     </Text>
//                   )}
//                   {isRecordStart && (
//                     <TouchableOpacity
//                       onPress={this.onStopRecord}
//                       disabled={loading}>
//                       {loading ? (
//                         <></>
//                       ) : (
//                         <Icon
//                           name="pause"
//                           type="AntDesign"
//                           size={24}
//                           color="#4F4F4F"
//                         />
//                       )}
//                     </TouchableOpacity>
//                   )}
//                 </>
//               )}
//             </View>
//           </View>
//           <TouchableOpacity
//             style={styles(this.theme).iconContainer}
//             onPress={imagebasecamera.length === 0 ? null : this.sendMessage}>
//             <Icon
//               name={'arrow-up'}
//               type="feather"
//               size={24}
//               color={input.length === 0 ? '#4F4F4F' : '#fff'}
//             />
//           </TouchableOpacity>
//         </View>
//         {this.state.isShowGalleryPicker && (
//           <CustomDocumentPicker
//             theme={this.theme}
//             closePopup={this.handleClosePopup}
//             nav={this.props.navigation}
//             handleDataUpdate={this.handleImgUpdate}
//           />
//         )}
//       </View>
//     );
//   }
// }

// const styles = theme =>
//   StyleSheet.create({
//     flexContainer: {
//       flex: 1,
//     },
//     header: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: theme.scale * 30,
//       backgroundColor: '#fff',
//     },
//     headerTitle: {
//       flex: 1,
//       textAlign: 'center',
//       fontSize: theme.scale * 18,
//     },
//     messagesContainer: {
//       flex: 1,
//       padding: theme.scale * 16,
//       backgroundColor: '#fff',
//     },
//     chatGPTContainer: {
//       alignSelf: 'flex-start',
//       marginBottom: theme.scale * 10,
//       padding: theme.scale * 10,
//       maxWidth: '80%',
//     },
//     userContainer: {
//       alignSelf: 'flex-end',
//       padding: theme.scale * 10,
//       backgroundColor: '#E1E1E1',
//       borderRadius: theme.scale * 12,
//       marginBottom: theme.scale * 10,
//       maxWidth: '80%',
//     },
//     username: {
//       fontWeight: 'bold',
//       marginBottom: theme.scale * 5,
//       color: '#000000',
//     },
//     message: {
//       fontSize: theme.scale * 16,
//       color: '#000000',
//     },
//     inputRow: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingTop: theme.scale * 10,
//       paddingHorizontal: 5,
//       bottom: theme.scale * 8,
//     },
//     inputContainer: {
//       flexDirection: 'column',
//       // alignItems: 'center',
//       backgroundColor: '#E0E0E0',
//       // borderRadius: theme.scale * 50,
//       paddingHorizontal: theme.scale * 8,
//       paddingVertical: theme.scale * 5,
//       marginHorizontal: theme.scale * 5,
//       flex: 1,
//     },
//     input: {
//       flex: 1,
//       height: theme.scale * 40,
//       paddingLeft: theme.scale * 10,
//       paddingRight: theme.scale * 10,
//       fontSize: theme.scale * 16,
//       color: '#4F4F4F',
//     },
//     iconLeftContainer: {
//       alignItems: 'center',
//       backgroundColor: '#E0E0E0',
//       borderRadius: theme.scale * 50,
//       padding: theme.scale * 8,
//       margin: theme.scale * 2,
//     },
//     iconContainer: {
//       alignItems: 'center',
//       backgroundColor: '#000',
//       borderRadius: theme.scale * 50,
//       padding: theme.scale * 8,
//     },
//     recTextStyle: {
//       fontSize: 14 * theme.scale,
//       fontWeight: '600',
//       // marginTop: '3%',
//       paddingLeft: '2%',
//       color: '#444',
//     },
//     stopBtnStyle: {
//       // padding: 14 * theme.scale,
//       backgroundColor: '#023C66',
//       width: '95%',
//       alignItems: 'center',
//       alignSelf: 'center',
//       justifyContent: 'center',
//       height: 55,
//       borderRadius: 6 * theme.scale,
//       marginBottom: 20,
//       // marginTop: 20 * theme.scale,
//     },

//     btnTextStyle: {
//       fontSize: 14 * theme.scale,
//       fontWeight: '700',
//       color: '#fff',
//       textAlign: 'center',
//     },
//     crossView: {
//       width: theme.scale * 20,
//       height: theme.scale * 20,
//       backgroundColor: '#ffff',
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 40,
//       zIndex: 3,

//       position: 'absolute',
//       top: 13,
//       left: 80,
//     },
//   });

// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Platform,
//   TextInput,
//   KeyboardAvoidingView,
// } from 'react-native';
// import React, {Component} from 'react';
// import {Icon} from 'react-native-elements';
// import CustomStyles from '../../styles/CustomStyles';
// import PullToRefresh from '../../components/PullToRefresh';
// import ic_recording from '../../../assets/icons/ic_recording.gif';
// import ic_recording_mic from '../../../assets/icons/ic_recording_mic.png';
// import ic_pause_buttton from '../../../assets/icons/ic_pause_buttton.png';
// import RNFS from 'react-native-fs';
// import RNFetchBlob from 'rn-fetch-blob';
// // import ic_recording from 'assets/icons/ic_recording.gif';
// // import ic_recording_mic from 'assets/icons/ic_recording_mic.png';
// // import ic_pause_buttton from 'assets/icons/ic_pause_buttton.png';

// import AudioRecorderPlayer, {
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
//   AudioEncoderAndroidType,
//   AudioSourceAndroidType,
//   OutputFormatAndroidType,
// } from 'react-native-audio-recorder-player';

// import {
//   check,
//   request,
//   openSettings,
//   PERMISSIONS,
//   RESULTS,
// } from 'react-native-permissions';
// import {RNFetchBlobFetchPolyfill} from 'rn-fetch-blob';
// import Header from '../../layouts/Header';

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import CustomStyles from '../../styles/CustomStyles';
import ic_recording_mic from '../../../assets/icons/mic.png';
import ic_pause_buttton from '../../../assets/icons/pause.png';
import ic_play_buttton from '../../../assets/icons/playNew.png';
import ic_ok_buttton from '../../../assets/icons/stop-button.png';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';

import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS, {copyFile} from 'react-native-fs';
import Header from '../../layouts/Header';
import CustomDocumentPicker from '../../components/customComponent/CustomDocumentPicker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {makeRequest} from '../../../utils/MakeNetworkRequest';

export default class Chatgpt extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      input: '',
      plusToggle: true,
      messages: [],
      imageData: '',
      isRecordStart: false,
      loading: false,
      isRecordpaused: false,
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      newAudioData: '',
      recText: '',
      isTyping: false,
      stopButton: false,
      // Recording Customization
      recIcon: ic_recording_mic,
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09);
  }

  requestPermission = async permission => {
    try {
      const platformPermission = Platform.select({
        android: permission,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      });

      const result = await check(platformPermission);

      switch (result) {
        case RESULTS.DENIED:
          const requestResult = await request(platformPermission);
          switch (requestResult) {
            case RESULTS.GRANTED:
              return RESULTS.GRANTED;
          }
          break;
        case RESULTS.GRANTED:
          return RESULTS.GRANTED;
        case RESULTS.BLOCKED:
          Alert.alert(
            'Permission Blocked',
            'Press OK and provide permission in App Setting',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: this.handleOpenSettings,
              },
            ],
            {cancelable: false},
          );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  onStartRecord = async () => {
    const granted = await this.requestPermission(
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    );
    console.log(granted, 'granted');
    if (granted !== 'granted') {
      return;
    }
    this.setState({stopButton: false});
    const path =
      Platform.OS === 'android'
        ? `${RNFetchBlob.fs.dirs.CacheDir}/response.mp3`
        : 'hello.m4a';

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.DEFAULT,
    };

    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    console.log('URI ::::', uri);
    this.setState({
      isRecordStart: true,
      recIcon: ic_pause_buttton,
      recText: 'Recording...',
    });

    this.audioRecorderPlayer.addRecordBackListener(e => {
      console.log('Record time', e);
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
    });
  };

  convertAudioToBase64 = async (filePath, mimeType) => {
    try {
      const fileData = await RNFS.readFile(filePath, 'base64');
      console.log(fileData);

      const base64Data = await RNFetchBlob.fs
        .readFile(filePath, 'base64')
        .catch(error => {
          console.error(error);
        });
      return fileData;
    } catch (err) {
      console.log(err);
    }
  };

  onStopRecord = async () => {
    console.log('stop');
    this.setState({
      isRecordStart: false,
      recIcon: ic_recording_mic,
      loading: true,
      recText: 'Please wait while we are generating prescription...',
      stopButton: true,
    });
    const result = await this.audioRecorderPlayer.stopRecorder();
    console.log(result);
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });

    let resp = await this.uriToBlob(result);
    console.log('resprespresprespresp', resp);

    let imageData = {...resp.data, uri: result};

    const filePath = imageData.uri;
    console.log('filePathfilePath', filePath);
    const mimeType = imageData.type;
    console.log('mimeTypemimeType', mimeType);

    const base64String = await this.convertAudioToBase64(filePath, mimeType);
    console.log('base64String', base64String);
    try {
      const params = {
        name: base64String,
      };
      const response = await makeRequest(
        'https://ai-api.sourceinfosys.com:6000/convert',
        params,
      );
      if (response.r_code === 200) {
        Alert.alert(
          'Error',
          'Unable to generate prescription. Please try again.',
          [
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.navigate('AppointmentDetail');
              },
            },
          ],
          {cancelable: false},
        );

        this.setState({loading: false});
        return;
      }
      console.log('response First', response.data);
      this.setState({audioText: response.data});
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        'Network Request Failed',
        'Unable to generate prescription. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => {
              this.props.navigation.navigate('AppointmentDetail');
            },
          },
        ],
        {cancelable: false},
      );

      this.setState({recText: ''});
      this.setState({loading: false});
      this.setState({stopButton: false});
    }
    this.props.closePopup();
    this.props.handleImgUpdate('audio', imageData);
  };

  onPauseRecord = async () => {
    console.log('onpause record');
    try {
      const r = await this.audioRecorderPlayer.pauseRecorder();
      this.setState({
        isRecordpaused: true,
        recIcon: ic_play_buttton,
        recText: 'Paused',
      });
      console.log(r);
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  onResumeRecord = async () => {
    console.log('onresume');
    try {
      await this.audioRecorderPlayer.resumeRecorder();
      this.setState({
        isRecordpaused: false,
        recIcon: ic_pause_buttton,
        recText: 'Recording...',
      });
    } catch (err) {
      console.log('Resume Recorder', err);
    }
  };

  onCancelRecord = async () => {
    console.log('oncencel');
    this.setState({isRecordStart: false});
    await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
      recIcon: ic_pause_buttton,
      recText: '',
    });
  };

  onStartPlay = async e => {
    console.log('onStartPlay');
    //const path = 'hello.m4a'
    const {newAudioData} = this.state;

    const msg = await this.audioRecorderPlayer.startPlayer(
      JSON.parse(newAudioData).uri,
    );
    this.audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };
  onPausePlay = async e => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async e => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  uriToBlob = uri => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };
  toggleSwitch = () => {
    this.setState(prevState => ({
      plusToggle: !prevState.plusToggle,
    }));
  };

  handleMessage = text => {
    this.setState({input: text});
    if (text !== '0') {
      this.setState({plusToggle: true});
    }
  };
  onFocusInput = () => {
    this.setState({plusToggle: true});
  };

  sendMessage = async () => {
    const {input, messages, audioText} = this.state;
    console.log('audioTextInput', audioText, input);
    // if (input.trim().length > 0 && audioText.trim().length > 0 ) {
    try {
      const newMessage = {
        id: (messages.length + 1).toString(),
        user: 'User',
        message: input || audioText,
      };
      this.setState(prevState => ({
        messages: [newMessage, ...prevState.messages],
        input: '',
        isTyping: true, // Set isTyping to true when starting to send message
      }));
      const params = {
        input: input || audioText,
      };
      console.log('params1003', params);

      const response = await makeRequest(
        'https://ai-api.sourceinfosys.com:7001/chat',
        params,
        false,
      );
      console.log('response', response);

      if (response) {
        setTimeout(() => {
          this.setState({audioText: '', isTyping: false});
          const chatGptResponse = {
            id: (this.state.messages.length + 1).toString(),
            user: 'ECHS',
            message: response.response,
          };
          this.setState(prevState => ({
            messages: [chatGptResponse, ...prevState.messages],
          }));
        }, 1000);
      }
    } catch (error) {
      console.log(error.message);
      this.setState({isTyping: false}); // Ensure isTyping is set to false in case of error
    }

    // }
  };
  renderMessage = ({item}) => {
    const isChatGPT = item.user === 'ECHS';
    return (
      <View
        style={
          isChatGPT
            ? styles(this.theme).chatGPTContainer
            : styles(this.theme).userContainer
        }>
        <Text style={styles(this.theme).username}>{item.user}</Text>
        <Text style={styles(this.theme).message}>{item.message}</Text>
      </View>
    );
  };

  getmember_api_call = () => {};

  render() {
    const {
      isRecordStart,
      audioText,
      isRecordpaused,
      isTyping,
      stopButton,
      loading,
    } = this.state;
    const {input, plusToggle} = this.state;
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title="ECHS Policies"
          theme={this.theme}
          navigation={this.props.navigation}
          showBack={true}
        />
        <View style={CustomStyles(this.theme).mainContainer}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
            }}>
            <View style={styles(this.theme).messagesContainer}>
              <FlatList
                data={this.state.messages}
                keyExtractor={item => item.id}
                renderItem={this.renderMessage}
                inverted
              />
              {isTyping && (
                <View style={styles(this.theme).typingContainer}>
                  <Text style={styles(this.theme).typingText}>Typing...</Text>
                </View>
              )}
            </View>

            <View style={styles(this.theme).inputRow}>
              {/* {plusToggle ? (
                <TouchableOpacity
                  style={styles(this.theme).iconLeftContainer}
                  onPress={this.toggleSwitch}>
                  <Icon name="plus" type="feather" size={24} color="#4F4F4F" />
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity>
                    <Icon
                      name="camera"
                      type="feather"
                      size={24}
                      color="#4F4F4F"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft: 10}}>
                    <Icon
                      name="file"
                      type="feather"
                      size={24}
                      color="#4F4F4F"
                    />
                  </TouchableOpacity>
                </>
              )} */}
              <View style={styles(this.theme).inputContainer}>
                <TextInput
                  style={styles(this.theme).input}
                  placeholder="Message"
                  value={input || audioText}
                  onFocus={this.onFocusInput}
                  onChangeText={this.handleMessage}
                  multiline={true}
                  numberOfLines={4}
                />
                {input.length === 0 && (
                  <>
                    {stopButton && <ActivityIndicator color="white" />}
                    <TouchableOpacity
                      disabled={false}
                      onPress={
                        isRecordStart
                          ? isRecordpaused
                            ? this.onResumeRecord
                            : this.onPauseRecord
                          : this.onStartRecord
                      }>
                      <Image
                        style={[styles(this.theme).recIconStyle]}
                        source={this.state.recIcon}
                      />
                    </TouchableOpacity>
                    {isRecordStart && (
                      <Text style={styles(this.theme).recTextStyle}>
                        {this.state.recordTime}
                      </Text>
                    )}
                    {isRecordStart && (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles(this.theme).recTextStyle}>
                          {this.state.recText}
                        </Text>
                        <View style={{height: 35}}>
                          <TouchableOpacity
                            onPress={this.onStopRecord}
                            // disabled={loading}
                          >
                            <Image
                              style={[
                                styles(this.theme).recIconStyle,
                                {height: 35},
                              ]}
                              source={ic_ok_buttton}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    {/* {!isRecordStart && (
                      <View>
                        <ActivityIndicator color="white" />
                      </View>
                    )} */}
                  </>
                )}
              </View>
              <TouchableOpacity
                style={styles(this.theme).iconContainer}
                onPress={this.sendMessage}>
                <Icon
                  name={'arrow-up'}
                  type="feather"
                  size={24}
                  color={'#fff'}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    flexContainer: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.scale * 30,
      backgroundColor: '#fff',
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: theme.scale * 18,
    },
    messagesContainer: {
      flex: 1,
      padding: theme.scale * 16,
      backgroundColor: '#fff',
    },
    chatGPTContainer: {
      // alignSelf: 'flex-start',
      marginBottom: theme.scale * 10,
      padding: theme.scale * 10,
      maxWidth: '80%',
    },
    userContainer: {
      alignSelf: 'flex-end',
      padding: theme.scale * 10,
      backgroundColor: '#E1E1E1',
      borderRadius: theme.scale * 12,
      marginBottom: theme.scale * 10,
      maxWidth: '80%',
    },
    username: {
      fontWeight: 'bold',
      marginBottom: theme.scale * 5,
      color: '#000000',
    },
    message: {
      fontSize: theme.scale * 16,
      color: '#000000',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: theme.scale * 10,
      paddingHorizontal: 5,
      bottom: theme.scale * 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E0E0E0',
      borderRadius: theme.scale * 50,
      paddingHorizontal: theme.scale * 8,
      paddingVertical: theme.scale * 4,
      marginHorizontal: theme.scale * 5,
      flex: 1,
    },
    input: {
      flex: 1,
      maxHeight: 50,
      paddingLeft: theme.scale * 10,
      paddingRight: theme.scale * 10,
      fontSize: theme.scale * 16,
      color: '#4F4F4F',
    },
    iconLeftContainer: {
      alignItems: 'center',
      backgroundColor: '#E0E0E0',
      borderRadius: theme.scale * 50,
      padding: theme.scale * 8,
      margin: theme.scale * 2,
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor: '#000',
      borderRadius: theme.scale * 50,
      padding: theme.scale * 8,
    },
    recTextStyle: {
      fontSize: 14 * theme.scale,
      fontWeight: '600',
      marginTop: '3%',
      paddingLeft: '2%',
      color: '#444',
    },
    stopBtnStyle: {
      // padding: 14 * theme.scale,
      backgroundColor: '#023C66',
      width: '95%',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: 55,
      borderRadius: 6 * theme.scale,
      marginBottom: 20,
      // marginTop: 20 * theme.scale,
    },

    btnTextStyle: {
      fontSize: 14 * theme.scale,
      fontWeight: '700',
      color: '#fff',
      textAlign: 'center',
    },
    typingContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    typingText: {
      fontStyle: 'italic',
      color: 'gray',
    },
    recIconStyle: {
      height: 30,
      aspectRatio: 1 / 1,
    },
    recTextStyle: {
      fontSize: 14 * theme.scale,
      fontWeight: '600',
      // marginTop: "3%",
      paddingLeft: '2%',
      color: '#444',
    },
  });
