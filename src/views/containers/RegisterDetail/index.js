import RegisterDetail from './RegisterDetail';
// import {connect} from 'react-redux';

// layouts//
// import withCustomRootContainer from 'views/layouts/withCustomRootContainer';

// // selectors
// import {loaderSelectors} from 'state/ducks/loader';
// import {sessionSelectors} from 'state/ducks/session';

// // operations
// import {sessionOperations} from 'state/ducks/session';

const EnhancedComponent = RegisterDetail;

// const mapStateToProps = state => ({
//   isProcessing: loaderSelectors.isProcessing(state),
//   isOTPSent: sessionSelectors.isOTPSent(state),
// });

// const mapDispatchToProps = {
//   sendOTP: sessionOperations.sendOTP,
//   sendOTPReset: sessionOperations.sendOTPReset,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent);
export default EnhancedComponent;
