// import React, {PureComponent} from 'react';
// import {
//   View,
//   Animated,
//   StyleSheet,
//   ImageBackground,
//   StatusBar,
//   Text,
//   Image,
// } from 'react-native';
// import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
// // import no_image from 'assets/images/medsKey-logo.jpeg';
// import no_image from '../../../assets/images/medsKey-logo.jpeg'

// export default class SplashScreen extends PureComponent {
//   state = {
//     opacity: new Animated.Value(0),
//   };

//   handleAnimation = () => {
//     Animated.timing(this.state.opacity, {
//       toValue: 1,
//       duration: 2000,
//       useNativeDriver: true,
//     }).start();
//   };

//   render() {
//     const animatedImageStyle = [
//       {
//         opacity: this.state.opacity,
//         transform: [
//           {
//             scale: this.state.opacity.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0.85, 1],
//             }),
//           },
//         ],
//       },
//       styles.logo,
//     ];

//     return (
//       <ImageBackground
//         // source={ic_background_dark}
//         style={{flex: 1, backgroundColor: '#ffffff'}}>
//         <StatusBar
//           barStyle="dark-content"
//           hidden={false}
//           backgroundColor="#fff"
//           translucent={true}
//         />

//         <View
//           style={{
//             flex: 1,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Image
//             source={no_image}
//             // source={
//             //   image === '' ? no_image : {uri: `data:image/jpg;base64,${image}`}
//             // }
//             // source={{uri: `data:image/jpg;base64,${image}`}}
//             resizeMode="cover"
//             style={{
//               height: 200,
//               aspectRatio: 1 / 1,
//               borderRadius: 25,
//             }}
//           />
//           {/* <Text
//             style={{
//               fontSize: 30,
//               marginTop: 10,
//               color: '#204e79',
//               fontWeight: 'bold',
//             }}>
//             meds<Text style={{color: 'grey'}}>Key</Text>
//           </Text>
//           <Text
//             style={{
//               // top: 4,
//               // left: 40,
//               bottom: 0,
//               color: '#204e79',
//               fontWeight: 'bold',
//             }}>
//             Doctor
//           </Text> */}
//         </View>
//       </ImageBackground>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     height: hp(20),
//     aspectRatio: 1.2 / 1,
//     // aspectRatio: 4.48 / 1,
//   },
// });



import React, {PureComponent} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Easing
} from 'react-native';
import no_image from '../../../assets/images/ar_logo.png';

export default class SplashScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.RotateValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.StartImageRotationFunction();
  }

  StartImageRotationFunction() {
    this.RotateValue.setValue(0);
    Animated.timing(this.RotateValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(); // Remove the recursive call
  }

  render() {
    const RotateData = this.RotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <ImageBackground
        // source={ic_background_dark}
        style={{flex: 1, backgroundColor: '#ffffff'}}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#fff"
          translucent={true}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Animated.Image
            resizeMode="contain"
            style={{
              height: 200,
              aspectRatio: 1 / 1,
              borderRadius: 25,
              transform: [{rotateY: RotateData}],
            }}
            source={no_image}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 160,
    aspectRatio: 1.2 / 1,
  },
});
