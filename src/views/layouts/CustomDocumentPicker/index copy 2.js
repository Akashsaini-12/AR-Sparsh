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
import {requestPermission} from 'utils/requestPermission';

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

  handleImagePick = async () => {
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

      // let imgName = newData.name;

      // if (typeof fileName === 'undefined') {
      //   // on iOS, using camera returns undefined fileName. This fixes that issue, so API can work.
      //   var getFilename = newData.uri.split('/');
      //   imgName = getFilename[getFilename.length - 1];
      // }

      let imageData = {
        size: newData.fileSize,
        type: newData.type,
        name: newData.name,
        fileCopyUri: newData.uri,
        uri: newData.uri,
      };

      // const stat = await RNFetchBlob.fs.stat(imageData.uri);
      // console.log(stat);
      // imageData.uri = stat.path;
      // imageData.fileCopyUri = stat.path;

      this.convertAudioToBase64(imageData.uri, imageData.type).then(data => {
        const {handleDataUpdate, closePopup} = this.props;

        handleDataUpdate(data, imageData.name);

        closePopup();
      });
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
      return base64Data;
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
            onPress={this.handleImagePick}>
            {/* <Image
              source={ic_file_upload}
              resizeMode="cover"
              style={styles.userImage}
            /> */}
            <Text style={styles(this.theme).popUpText}>Upload File</Text>
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
      width: '100%',
      marginTop: -72,
      // backgroundColor: '#ffffff',
      borderRadius: theme.scale * 12,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },

    popUpViewList: {
      // flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.scale * 12,
      backgroundColor: '#fff',
      width: theme.scale * 140,
      aspectRatio: 1 / 1,
      borderRadius: theme.scale * 140,
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
    },
    // seperator: {
    //   height: 1,
    //   backgroundColor: '#ccc',
    //   marginVertical: wp(1),
    //   marginHorizontal: wp(3),
    // },
  });

export default CustomDocumentPicker;
