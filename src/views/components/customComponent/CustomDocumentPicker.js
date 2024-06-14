import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

// Images
// import ic_file_upload from 'assets/icons/ic_file_upload.png';

//Image Picker

//Permission
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
// import {requestPermission} from 'utils/requestPermission';
import {requestPermission} from '../../../utils/requestPermission';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

//Icons

class CustomDocumentPicker extends Component {
  constructor(props) {
    super(props);
    this.theme = props.theme;
    this.state = {
      userImage: '',
      userPic: '',
      dataName: '',
    };

    this.parentView = null;
  }

  handleGalleryImage = async viewId => {
    const granted = await requestPermission(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );

    if (granted !== 'granted') {
      return;
    }

    try {
      const option = {
        skipBackup: true,
        includeBase64: true,
        mediaType: 'photo',
        quality: 0.7,
      };

      const response = await launchImageLibrary(option);

      if (Platform.OS === 'android') {
        let newData = response.assets[0];

        let imageData = {
          size: newData.fileSize,
          type: newData.type,
          name: newData.fileName,
          fileCopyUri: newData.uri,
          uri: newData.uri,
        };

        const {handleDataUpdate, closePopup} = this.props;

        const stat = await RNFetchBlob.fs.stat(imageData.uri);
        imageData.uri = stat.path;
        imageData.fileCopyUri = stat.path;

        this.convertAudioToBase64(imageData.uri, imageData.type).then(data => {
          handleDataUpdate(data, imageData.name);
          closePopup();
        });
      } else if (Platform.OS === 'ios') {
        let newData = response.assets.map(data => {
          const {fileName, fileSize, type, uri} = data;
          let imgName = fileName;

          if (typeof fileName === 'undefined') {
            // on iOS, using the camera returns undefined fileName. This fixes that issue so API can work.
            var getFilename = uri.split('/');
            imgName = getFilename[getFilename.length - 1];
          }

          const imageData = {
            size: fileSize,
            type: type,
            name: imgName,
            fileCopyUri: uri,
            uri: uri,
          };

          return imageData;
        });

        const {handleDataUpdate, closePopup} = this.props;

        newData.forEach(imageData => {
          this.convertAudioToBase64(imageData.uri, imageData.type).then(
            data => {
              handleDataUpdate(data, imageData.name);
            },
          );
        });

        closePopup();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleFileImagePick = async () => {
    try {
      // const granted = await requestPermission(
      //   PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      // );

      // if (granted !== 'granted') {
      //   return;
      // }

      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.allFiles],
      });

      let newData = response[0];

      let imageData = {
        size: newData.size,
        type: newData.type,
        name: newData.name,
        fileCopyUri: newData.uri,
        uri: newData.uri,
      };
      const path = RNFS.CachesDirectoryPath + '/' + imageData.name;

      // Check if the file already exists
      const fileExists = await RNFS.exists(path);

      if (fileExists) {
        // If the file exists, delete it before copying the new one
        await RNFS.unlink(path);
      }

      // Download the file to the app's cache directory
      await RNFS.copyFile(imageData.uri, path);

      // Now 'path' contains the correct file path that can be used by your code
      imageData.uri = path;
      imageData.fileCopyUri = path;

      console.log('imageDataimageDataimageData', imageData);
      // imageData.uri = stat.path;
      // imageData.fileCopyUri = stat.path;

      this.convertAudioToBase64(imageData.uri, imageData.type).then(data => {
        const {handleDataUpdate, closePopup} = this.props;

        // handleDataUpdate(data, imageData.name);
        handleDataUpdate(data, imageData.name, imageData.size);

        closePopup();
      });
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log(error);
      }
    }
  };

  handleImagePick = async () => {
    try {
      launchImageLibrary({mediaType: 'photo'}, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          let imageData = {
            size: response.assets[0].fileSize,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            uri: response.assets[0].uri,
          };

          console.log('imageData:', imageData);

          const path = RNFS.CachesDirectoryPath + '/' + imageData.name;

          // Check if the file already exists
          const fileExists = await RNFS.exists(path);

          if (fileExists) {
            // If the file exists, delete it before copying the new one
            await RNFS.unlink(path);
          }

          // Download the file to the app's cache directory
          await RNFS.copyFile(imageData.uri, path);

          // Now 'path' contains the correct file path that can be used by your code
          imageData.uri = path;

          console.log('Updated imageData:', imageData ,'kkkk');

          this.convertAudioToBase64Android(imageData.uri, imageData.type).then(
            data => {
              const {handleDataUpdate, closePopup} = this.props;

              handleDataUpdate(data, imageData.name);

              closePopup();
            },
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleImagePickAndroid = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.allFiles],
      });

      let newData = response[0];

      let imageData = {
        size: newData.fileSize,
        type: newData.type,
        name: newData.name,
        fileCopyUri: newData.uri,
        uri: newData.uri,
      };
      const path = RNFS.CachesDirectoryPath + '/' + imageData.name;

      // Check if the file already exists
      const fileExists = await RNFS.exists(path);

      if (fileExists) {
        // If the file exists, delete it before copying the new one
        await RNFS.unlink(path);
      }

      // Download the file to the app's cache directory
      await RNFS.copyFile(imageData.uri, path);

      // Now 'path' contains the correct file path that can be used by your code
      imageData.uri = path;
      imageData.fileCopyUri = path;

      console.log('imageDataimageDataimageData', imageData);

      this.convertAudioToBase64Android(imageData.uri, imageData.type).then(
        data => {
          const {handleDataUpdate, closePopup} = this.props;

          handleDataUpdate(data, imageData.name);

          closePopup();
        },
      );
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log(error);
      }
    }
  };
  convertAudioToBase64 = async (filePath, mimeType) => {
    try {
      // Read the audio file
      // const fileData = await RNFS.readFile(filePath, 'base64');
      // console.log(fileData);

      const base64Data = await RNFetchBlob.fs
        .readFile(filePath, 'base64')
        .catch(error => {
          console.error(error);
        });
      // return base64Data;
      return `data:${mimeType};base64,${base64Data}`;
    } catch (err) {
      console.log(err);
    }
  };
  convertAudioToBase64Android = async (filePath, mimeType) => {
    try {
      // Read the audio file
      // const fileData = await RNFS.readFile(filePath, 'base64');
      // console.log(fileData);

      const base64Data = await RNFetchBlob.fs
        .readFile(filePath, 'base64')
        .catch(error => {
          console.error(error);
        });
      return `data:${mimeType};base64,${base64Data}`;
    } catch (err) {
      console.log(err);
    }
  };

  setViewRef = ref => {
    this.parentView = ref;
  };

  handleStartShouldSetResponder = event => {
    if (this.parentView._nativeTag === event.target._nativeTag) {
      this.props.closePopup();
    }
  };
  handleUpdateImage = async () => {
    try {
      launchImageLibrary({mediaType: 'photo'}, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const {assets} = response;

          if (assets.length > 0) {
            let newData = assets[0];

            let imageData = {
              size: newData.fileSize,
              type: newData.type,
              name: newData.name,
              fileCopyUri: newData.uri,
              uri: newData.uri,
            };

            console.log('imageDataOf theIcon:', imageData);

            const path = RNFS.CachesDirectoryPath + '/' + imageData.name;

            const fileExists = await RNFS.exists(imageData.uri);
            if (!fileExists) {
              console.log('Error: Image file does not exist at specified URI');
              return;
            }

            try {
              await RNFS.copyFile(imageData.uri, path);
              console.log('Image copied successfully.');

              imageData.uri = path; // Update URI to use file protocol

              console.log('Updated imageData11:', path);

              this.convertAudioToBase64Android(
                imageData.uri,
                imageData.type,
              ).then(data => {
                const {handleDataUpdate, closePopup} = this.props;

                handleDataUpdate(data, imageData.name);

                closePopup();
              });
            } catch (error) {
              console.log('Error copying image:', error);
            }
          } else {
            console.log('No image selected.');
          }
        }
      });
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  handleApply = () => {
    this.props.closePopup();
  };

  render() {
    return (
      <View
        ref={this.setViewRef}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        style={styles(this.theme).modalContainer}>
        <View style={styles(this.theme).popupContainer}>
          {/* <View style={styles.seperator} /> */}
          <TouchableOpacity
            style={styles(this.theme).popUpViewList}
            onPress={
              Platform.OS === 'android'
                ? this.handleUpdateImage
                : this.handleImagePick
            }>
            {/* <Image
              source={ic_file_upload}
              resizeMode="cover"
              style={styles.userImage}
            /> */}
            <Text style={styles(this.theme).popUpText}>
              Upload from Gallery
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles(this.theme).popupContainer}>
          {/* <View style={styles.seperator} /> */}
          <TouchableOpacity
            style={styles(this.theme).popUpViewList}
            onPress={this.handleFileImagePick}>
            {/* <Image
              source={ic_file_upload}
              resizeMode="cover"
              style={styles.userImage}
            /> */}
            <Text style={styles(this.theme).popUpText}>Upload from Files</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.8)',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      zIndex: 15,
    },

    popupContainer: {
      width: '90%',
      marginTop: 10,
      backgroundColor: '#fff',
      borderRadius: theme.scale * 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    // popupContainer1: {
    //   width: '100%',
    //   marginTop: -72,
    //   // backgroundColor: '#ffffff',
    //   borderRadius: theme.scale * 12,
    //   flexDirection: 'row',
    //   justifyContent: 'space-around',
    // },

    popUpViewList: {
      // flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // padding: theme.scale * 10,
      backgroundColor: '#fff',
      width: '100%',
      // aspectRatio: 1 / 1,
      height: 60,
      borderRadius: theme.scale * 20,
      elevation: theme.scale * 50,
    },

    userImage: {
      height: theme.scale * 72,
      aspectRatio: 1 / 1,
    },

    popUpText: {
      marginTop: theme.scale * 6,
      fontSize: theme.scale * 14,
      fontWeight: '600',
      color: '#222',
      textAlign: 'center',
    },
    // seperator: {
    //   height: 1,
    //   backgroundColor: '#ccc',
    //   marginVertical: wp(1),
    //   marginHorizontal: wp(3),
    // },
  });

export default CustomDocumentPicker;
