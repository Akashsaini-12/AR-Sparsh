/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  Platform,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RNFS from "react-native-fs";
import {
  showErrorToast,
  showMessageToast,
} from "views/layouts/CustomToastMessage";
import { KEYS, getData } from "../../AsyncStorage";
import { BASE_URL, makeRequest } from "utils/MakeNetworkRequest";
import RNFetchBlob from "rn-fetch-blob";

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from "react-native-audio-recorder-player";

import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";

//  Icons
import ic_recording from "assets/icons/ic_recording.gif";
import ic_recording_mic from "assets/icons/ic_recording_mic.png";
import ic_pause_buttton from "assets/icons/ic_pause_buttton.png";
import ic_user from "assets/images/pat-image.png";

import Header from "views/layouts/Header";
import HomeFooter from "views/layouts/Footer/HomeFooter";
import TabContainer from "views/layouts/TabContainer";
import CustomStyles from "views/styles/CustomStyles";

export default class PatientDocRecording extends React.Component {
  constructor(props) {
    super(props);

    this.theme = props.route.params.theme; // this came as initialParam
    this.cardDetails = props.route.params.cardDetails; // this came as initialParam
    // console.log('this.cardDetails', this.cardDetails);
    this.state = {
      isRecordStart: false,
      loading: false,
      isRecordpaused: false,
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: "00:00:00",
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: "00:00:00",
      duration: "00:00:00",
      imageData: "",
      newAudioData: "",

      // Recording Customization
      recIcon: ic_recording_mic,
      recText: "",
    };

    // Audio
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09);
    this.state.prop = {};
    this.formData = {};
    this.theme = props.route.params.theme;

    this.profilePic =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=";
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the refresh state has changed
    if (prevState.refresh !== this.state.refresh) {
      // Perform any necessary actions before the refresh
      // ...

      // After performing necessary actions, reset the refresh state
      this.setState({ refresh: false });
    }
  }

  requestPermission = async (permission) => {
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
            "Permission Blocked",
            "Press OK and provide permission in App Setting",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: this.handleOpenSettings,
              },
            ],
            { cancelable: false }
          );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleOpenSettings = async () => {
    try {
      await openSettings();
    } catch (error) {
      console.log("Unable to open App Settings:", error);
    }
  };

  onStartRecord = async () => {
    const granted = await this.requestPermission(
      PERMISSIONS.ANDROID.RECORD_AUDIO
    );

    if (granted !== "granted") {
      return;
    }

    const path =
      Platform.OS === "android"
        ? `${RNFetchBlob.fs.dirs.CacheDir}/response.mp3`
        : "hello.m4a";

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.DEFAULT,
    };

    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    console.log("URI ::::", uri);
    this.setState({
      isRecordStart: true,
      recIcon: ic_recording,
      recText: "Recording...",
    });

    this.audioRecorderPlayer.addRecordBackListener((e) => {
      console.log("Record time", e);
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition)
        ),
      });
    });
  };
  convertAudioToBase64 = async (filePath, mimeType) => {
    try {
      // Read the audio file
      const fileData = await RNFS.readFile(filePath, "base64");
      console.log(fileData);

      const base64Data = await RNFetchBlob.fs
        .readFile(filePath, "base64")
        .catch((error) => {
          console.error(error);
        });
      return fileData;
    } catch (err) {
      console.log(err);
    }
  };

  onStopRecord = async () => {
    this.setState({
      isRecordStart: true,
      recIcon: ic_recording_mic,
      loading: true,
      recText: "Please wait while we are generating prescription...",
    });
    const result = await this.audioRecorderPlayer.stopRecorder();
    console.log(result);
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });

    let resp = await this.uriToBlob(result);
    console.log("resprespresprespresp", resp);

    let imageData = { ...resp.data, uri: result };

    const filePath = imageData.uri;
    console.log("filePathfilePath", filePath);
    const mimeType = imageData.type;
    console.log("mimeTypemimeType", mimeType);

    const base64String = await this.convertAudioToBase64(filePath, mimeType);
    console.log("base64String", base64String);
    // this.props.navigation.navigate('PatientsPrescription', {
    //   cardDetails: this.cardDetails,
    // });

    try {
      const params = {
        name: base64String,
      };
      const response = await makeRequest(
        "https://ai-api.sourceinfosys.com:6000/convert",

        params
      );
      if (response.r_code === 200) {
        // Show an alert for unable to generate prescription
        Alert.alert(
          "Error",
          "Unable to generate prescription. Please try again.",
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate to another page here
                this.props.navigation.navigate("AppointmentDetail");
              },
            },
          ],
          { cancelable: false }
        );

        // Reset loading state
        this.setState({ loading: false });

        return;
      }
      console.log("response First", response.data);
      const params1 = {
        // extract_data: `Hello, my name is Prince Kumar. I have been suffering from cold, fever and cough since last 3 days. You have to undergo a blood test. I give you a 5-day medicine. You have to take 500mg of paracetamol twice a day for 7 days before meal . And you have to take 500mg of Azithromycin once a day for 5 days after meal , and Indomethacin 25 mg cap once a day for two days empty stomach. And you have to avoid cold drinks. And you have to eat apples and bananas.`,
        // };

        extract_data: response.data,
        // extract_data: `You can come in.What is your name? My name is Devanshi.What is your problem?I have a headache and body pain.I have a fever since 3-4 days.And...My feet are aching.But it's alright.Devanshi, since when you have this problem?Since 3-4 days.Alright, Devanshi.So, let me tell youI will tell you the medicines, you have to take it for 7 days,body temperature is 98 degree celsius Blood Pressure Measured is 132 mmhg and abdomen measured is 29 you have to take paracetamol and BETHANECHOL 25 MG TAB and Dolo 200 mg , due to the change inthe weather, you have a cold and cold, and due to that you have body pains, so the symptomsthat you are getting are of fever, so now you have to take precautions, like you have You have to stay away from junk food and take a bath in warm water and what they say, you have to eat healthy things and avoid things from outside`,
      };
      console.log("params1", params1);
      // const response = await makeRequest(BASE_URL + 'doc/voiceRecords', params);
      const response1 = await makeRequest(
        "https://ai-api.sourceinfosys.com:5009/extract",

        params1
      );
      console.log("response1response1response1", response1);
      if (response1.r_code === 500) {
        // Show an alert for unable to generate prescription
        Alert.alert(
          "Error",
          "Unable to generate prescription. Please try again.",
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate to another page here
                this.props.navigation.navigate("AppointmentDetail");
              },
            },
          ],
          { cancelable: false }
        );
        // Clear the recText
        this.setState({ recText: "" });

        // Reset loading state
        this.setState({ loading: false });

        return;
      }
      console.log("response1.data", JSON.parse(response1.data));
      console.log("response1.sdc_code", response1.sdc_code);

      // Extracting data
      const patientData = JSON.parse(response1.data);
      const patientName = patientData["Patient name"];
      const symptoms = patientData["Symptoms"];
      const medicines = patientData["Medicines"];
      const investigations = patientData["Investigations"];
      const foodsPrescribed = patientData["Foods prescribed"];
      const forbiddenItems = patientData["Forbidden items"];
      const opdRemarks = patientData["OPD Remarks"];
      const vitals = patientData["Vitals"];
      const audioText = response.data;

      // Logging the extracted data
      console.log("Patient Name:", patientName);
      console.log("Symptoms:", symptoms.join(", "));

      console.log("Medicines:", medicines);
      medicines.forEach((medicine, index) => {
        console.log(`  Medicine ${index + 1}:`);
        console.log(`    Name: ${medicine.name}`);
        console.log(`    Dose: ${medicine.dose}`);
        console.log(`    Numberofdays: ${medicine.number_of_days}`);
        console.log(`    Dosage: ${medicine.dosage}`);
      });
      vitals.forEach((vitals, index) => {
        console.log(`  Medicine ${index + 1}:`);
        console.log(`    Name: ${vitals.name}`);
        console.log(`    Dose: ${vitals.value}`);
      });

      const medicinesListSDCCODE = response1.sdc_code;
      console.log(medicinesListSDCCODE, "medicinesListSDCCODE123456");

      // Displaying the list
      // medicinesListSDCCODE.forEach((medicine, index) => {
      //   console.log(`Medicine ${index + 1}:`);
      //   console.log(`  Medicine Name: ${medicine.medicine_name}`);
      //   console.log(`  Dosage: ${medicine.dosages}`);
      //   console.log(`  Instruction: ${medicine.instruction}`);
      //   console.log(`  Medicine Code: ${medicine.medicine_code}`);
      //   console.log(`  Store Code: ${medicine.store_code}`);
      //   console.log('\n');
      // });
      this.props.navigation.navigate("PatientsPrescription", {
        cardDetails: this.cardDetails,
        recordDetails: response1.data,
        allVoiceDetails: {
          patientName,
          symptoms,
          medicines,
          medicinesListSDCCODE,
          investigations,
          foodsPrescribed,
          forbiddenItems,
          opdRemarks,
          vitals,
          audioText,
        },
      });
      // this.setState({isProcessing: true});
      if (response) {
      } else {
        showErrorToast(response.rData.rMessage);
      }
      this.setState({ loading: false });
    } catch (error) {
      console.log(error.message);
      // Display an alert for the error
      Alert.alert(
        "Network Request Failed",
        "Unable to generate prescription. Please try again.",
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate to another page here
              this.props.navigation.navigate("AppointmentDetail");
            },
          },
        ],
        { cancelable: false }
      );

      this.setState({ recText: "" });
      this.setState({ loading: false });
    }

    // console.log(base64(stringifyObj));
    this.props.closePopup();
    this.props.handleImgUpdate("audio", imageData);
  };

  onPauseRecord = async () => {
    try {
      const r = await this.audioRecorderPlayer.pauseRecorder();
      this.setState({
        isRecordpaused: true,
        recIcon: ic_pause_buttton,
        recText: "Paused",
      });
      console.log(r);
    } catch (err) {
      console.log("pauseRecord", err);
    }
  };

  onResumeRecord = async () => {
    try {
      await this.audioRecorderPlayer.resumeRecorder();
      this.setState({
        isRecordpaused: false,
        recIcon: ic_recording,
        recText: "Recording...",
      });
    } catch (err) {
      console.log("Resume Recorder", err);
    }
  };

  onCancelRecord = async () => {
    this.setState({ isRecordStart: false });
    await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    // this.props.closePopup();
    this.setState({
      recordSecs: 0,
    });
  };

  onStartPlay = async (e) => {
    console.log("onStartPlay");
    //const path = 'hello.m4a'
    const { newAudioData } = this.state;

    const msg = await this.audioRecorderPlayer.startPlayer(
      JSON.parse(newAudioData).uri
    );
    this.audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log("finished");
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position)
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };
  onPausePlay = async (e) => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async (e) => {
    console.log("onStopPlay");
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        reject(new Error("uriToBlob failed"));
      };

      // this helps us get a blob
      xhr.responseType = "blob";

      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  render() {
    const { isRecordStart, isRecordpaused, loading } = this.state;

    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          navigation={this.props.navigation}
          title="Generate Prescription"
          theme={this.theme}
          showBack={true}
        />
        {/* <TabContainer title="TapCard" navigation={this.props.navigation} /> */}
        <View style={styles(this.theme).topPane}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 16 * this.theme.scale,
              color: this.theme.color.primary,
              alignSelf: "flex-end",
              marginBottom: 0,
            }}
          >
            {this.cardDetails?.title}
          </Text>

          <Image
            style={styles(this.theme).profilePic}
            // source={ic_user}
            source={
              this.cardDetails.imgData === ""
                ? ic_user
                : { uri: this.cardDetails.imgData }
            }
            resizeMode="cover"
          />
        </View>

        <View style={styles(this.theme).bottomPane}>
          {loading ? (
            <View style={{ alignItems: "center", marginTop: 120 }}>
              <Image
                style={[styles(this.theme).recIconStyle]}
                source={require("../../../assets/images/presc.png")}
              />
            </View>
          ) : (
            <TouchableOpacity
              disabled={this.state.loading}
              onPress={
                isRecordStart
                  ? isRecordpaused
                    ? this.onResumeRecord
                    : this.onPauseRecord
                  : this.onStartRecord
              }
              style={{ alignItems: "center", marginTop: 120 }}
            >
              <Image
                style={[styles(this.theme).recIconStyle]}
                source={this.state.recIcon}
              />
            </TouchableOpacity>
          )}
          {isRecordStart && (
            <Text style={styles(this.theme).recTextStyle}>
              {this.state.recText}
            </Text>
          )}
          {isRecordStart && (
            <Text style={styles(this.theme).recTextStyle}>
              {this.state.recordTime}
            </Text>
          )}
        </View>
        {isRecordStart && (
          <TouchableOpacity
            onPress={this.onStopRecord}
            style={styles(this.theme).stopBtnStyle}
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles(this.theme).btnTextStyle}>
                Stop & Proceed
              </Text>
            )}
          </TouchableOpacity>
        )}
        <HomeFooter
          title="New Prescription"
          theme={this.theme}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = (theme) =>
  StyleSheet.create({
    topPane: {
      width: "100%",
      height: theme.scale * 60,
      padding: theme.scale * 15,
      backgroundColor: "#fff",

      shadowColor: "black",
      shadowRadius: theme.scale * 5,
      shadowOffset: { top: -theme.scale * 20, width: 0, height: 0 },
      // shadowOpacity: 0.95 * theme.scale,
      // elevation: 8 * theme.scale,
      alignItems: "center",
      justifyContent: "flex-end",
    },

    bottomPane: {
      flex: 1,
      alignItems: "center",
      // justifyContent: 'center',
    },
    profilePic: {
      position: "absolute",
      top: 2 * theme.scale,
      left: 20 * theme.scale,
      alignSelf: "flex-start",

      width: 70,
      height: 70,
      borderRadius: 60 * theme.scale,
      backgroundColor: "white",
      borderWidth: 5 * theme.scale,
      borderColor: "#fff",
      shadowColor: "black",
      shadowRadius: 4 * theme.scale,
      shadowOffset: { top: 0, width: 0, height: 0 },
      elevation: 5 * theme.scale,
      shadowOpacity: 0.2 * theme.scale,
    },

    recIconStyle: {
      height: 200,

      aspectRatio: 1 / 1,
    },
    recTextStyle: {
      fontSize: 14 * theme.scale,
      fontWeight: "600",
      marginTop: "3%",
      paddingLeft: "2%",
      color: "#444",
    },
    stopBtnStyle: {
      // padding: 14 * theme.scale,
      backgroundColor: "#023C66",
      width: "95%",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      height: 55,
      borderRadius: 6 * theme.scale,
      marginBottom: 20,
      // marginTop: 20 * theme.scale,
    },

    btnTextStyle: {
      fontSize: 14 * theme.scale,
      fontWeight: "700",
      color: "#fff",
      textAlign: "center",
    },
  });
