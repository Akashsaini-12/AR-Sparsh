import React from 'react';
import {View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

// styles
import styles from './styles';

// components
import CustomLoader from 'views/layouts/CustomLoader';
import ProcessingLoader from 'views/layouts/ProcessingLoader';

const withCustomRootContainer = WrappedComponent => {
  const WithCustomRootContainer = props => {
    const {isFetching = false, isProcessing = false} = props;

    return (
      <View style={styles.container}>
        {isFetching ? <CustomLoader /> : <WrappedComponent {...props} />}
        {isProcessing && <ProcessingLoader />}
      </View>
    );
  };

  return WithCustomRootContainer;
};

export default withCustomRootContainer;
