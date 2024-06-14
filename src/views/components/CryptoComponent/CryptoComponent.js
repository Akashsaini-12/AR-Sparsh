import React from 'react';
import {View, Text} from 'react-native';
import CryptoJS from 'crypto-js';

class CryptoComponent extends React.Component {
  // Function to encrypt data with specified mode and padding using AES
  encryptAESData = (addInfoString, encryptionKey) => {
    const options = {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: CryptoJS.enc.Utf8.parse(encryptionKey.substring(0, 16)), // Use the first 16 characters of the encryption key as IV
    };
    const encryptedData = CryptoJS.AES.encrypt(
      encryptionKey.substring(0, 16) + addInfoString,
      CryptoJS.enc.Utf8.parse(encryptionKey),
      options,
    ).toString();
    return encryptedData;
  };

  decryptAESData = (encryptedData, encryptionKey) => {
    const options = {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: CryptoJS.enc.Utf8.parse(encryptionKey.substring(0, 16)), // Use the first 16 characters of the encryption key as IV
    };
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedData,
      CryptoJS.enc.Utf8.parse(encryptionKey),
      options,
    );
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };

  render() {
    return (
      <View>
        <Text>CryptoComponent</Text>
      </View>
    );
  }
}

export default CryptoComponent;
