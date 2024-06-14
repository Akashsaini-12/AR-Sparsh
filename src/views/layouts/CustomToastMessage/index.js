import Toast from 'react-native-root-toast';

export const showMessageToast = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: 'green',
    textColor: '#fff',
    opacity: 1,
  });
};

export const showErrorToast = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: 'red',
    textColor: '#fff',
    opacity: 1,
  });
};

export const showErrorToastTop = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: 'red',
    textColor: '#fff',
    opacity: 1,
    TOP: 20,
  });
};
