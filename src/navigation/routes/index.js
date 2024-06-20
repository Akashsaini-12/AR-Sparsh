/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';

// Libs
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {connect} from 'net';

// Theme
import {DEFAULT_LIGHT_THEME} from '../../views/theme/DefaultLight.theme';
import {useTheme} from '../../views/theme/Theme.context';
import {ThemeProvider} from '../../views/theme/Theme.context';

import Splash from '../../views/containers/Splash/Splash';
import Login from '../../views/containers/Login/Login';
import Registration from '../../views/containers/Registration';
import Report from '../../views/containers/Report/Report';
import Help from '../../views/containers/Help/Help';
import Home from '../../views/containers/Home/Home';
import CustomDashboardBox from '../../views/components/CustomBox/CustomDashboardBox';
import InfoDisseminator from '../../views/containers/InfoDisseminator/InfoDisseminator';
import Aresa from '../../views/containers/Aresa/Aresa';
import Argis from '../../views/containers/Argis/Argis';
import Cpbo from '../../views/containers/Cpbo/Cpbo';
import RecordBranch from '../../views/containers/RecordBranch.js/RecordBranch';
import Pension from '../../views/containers/Pension/Pension';
import Gpf from '../../views/containers/Gpf/Gpf';
import NormalGrievance from '../../views/containers/NormalGrievance/NormalGrievance';
import VigilanceGrievance from '../../views/containers/VigilanceGrievance/VigilanceGrievance';
import DgGrievance from '../../views/containers/DgGrievance/DgGrievance';
import UpdatePassword from '../../views/containers/UpdatePassword/UpdatePassword';
import ForgetPassword from '../../views/containers/ForgetPassword/ForgetPassword';
import VerifyOtp from '../../views/containers/VerifyOtp/VerifyOtp';
import ForgetPasswordUpdate from '../../views/containers/ForgetPasswordUpdate/ForgetPasswordUpdate';
import DocumentReqdClaims from '../../views/containers/DocumentReqdClaims/DocumentReqdClaims';
import ClaimStatus from '../../views/containers/ClaimStatus/ClaimStatus';
import AnnualArgisStatement from '../../views/containers/AnnualArgisStatement/AnnualArgisStatement';
import PaymentDetalisStatus from '../../views/containers/PaymentDetalisStatus/PaymentDetalisStatus';
import HbaUpdateStatus from '../../views/containers/HbaUpdateStatus/HbaUpdateStatus';
import EMIStatus from '../../views/containers/EMIStatus/EMIStatus';
import CpboMonthlyPaySlip from '../../views/containers/CpboMonthlyPaySlip/CpboMonthlyPaySlip';
import CpboForm from '../../views/containers/CpboForm-16/CpboForm';
import BillStatus from '../../views/containers/BillStatus/BillStatus';
import PostingProfile from '../../views/containers/PostingProfile/PostingProfile';
import Macp from '../../views/containers/Macp/Macp';
import Promotion from '../../views/containers/Promotion/Promotion';
import PtoDetails from '../../views/containers/PtoDetails/PtoDetails';
import LeaveDetails from '../../views/containers/LeaveDetails/LeaveDetails';
import KnowYourPension from '../../views/containers/KnowYourPension/KnowYourPension';
import ViewPdf from '../../views/components/customComponent/ViewPdf';
import GrievanceProgress from '../../views/components/customComponent/GrievanceProgress';
import DgGrievanceProgress from '../../views/components/customComponent/DgGrievanceProgress';
import Chatgpt from '../../views/containers/Chatgpt/Chatgpt';
// import EchsPolicy from '../../views/containers/EchsPolicy';
const Stack = createNativeStackNavigator();

function NavContainer(userInfo) {
  console.log('userInfo', userInfo);
  return (
    <ThemeProvider initial={DEFAULT_LIGHT_THEME}>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={userInfo.user ? 'Home' : 'Login'}
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Splash"
              component={Splash}
              initialParams={{theme: useTheme().theme}}
              options={{title: 'SplashScreen'}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Login',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
              {/* <Stack.Screen
              name="EchsPolicy"
              component={EchsPolicy}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'EchsPolicy',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            /> */}
            <Stack.Screen
              name="Registration"
              component={Registration}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Registration',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Report"
              component={Report}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Report',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Help',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Home',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="CustomDashboardBox"
              component={CustomDashboardBox}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'CustomDashboardBox',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="InfoDisseminator"
              component={InfoDisseminator}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'InfoDisseminator',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Aresa"
              component={Aresa}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Aresa',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Argis"
              component={Argis}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Argis',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Cpbo"
              component={Cpbo}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Cpbo',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="RecordBranch"
              component={RecordBranch}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'RecordBranch',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Pension"
              component={Pension}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Pension',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Gpf"
              component={Gpf}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Gpf',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="NormalGrievance"
              component={NormalGrievance}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'NormalGrievance',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="VigilanceGrievance"
              component={VigilanceGrievance}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'VigilanceGrievance',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="DgGrievance"
              component={DgGrievance}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'DgGrievance',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="UpdatePassword"
              component={UpdatePassword}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'UpdatePassword',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="VerifyOtp"
              component={VerifyOtp}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'VerifyOtp',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPassword}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'ForgetPassword',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="ForgetPasswordUpdate"
              component={ForgetPasswordUpdate}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'ForgetPasswordUpdate',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="DocumentReqdClaims"
              component={DocumentReqdClaims}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'DocumentReqdClaims',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="ClaimStatus"
              component={ClaimStatus}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'ClaimStatus',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="AnnualArgisStatement"
              component={AnnualArgisStatement}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'AnnualArgisStatement',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="PaymentDetalisStatus"
              component={PaymentDetalisStatus}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'PaymentDetalisStatus',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="HbaUpdateStatus"
              component={HbaUpdateStatus}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'HbaUpdateStatus',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="EMIStatus"
              component={EMIStatus}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'EMIStatus',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="CpboMonthlyPaySlip"
              component={CpboMonthlyPaySlip}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'CpboMonthlyPaySlip',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="CpboForm"
              component={CpboForm}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'CpboForm',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="BillStatus"
              component={BillStatus}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'BillStatus',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="PostingProfile"
              component={PostingProfile}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'PostingProfile',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Macp"
              component={Macp}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Macp',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="Promotion"
              component={Promotion}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Promotion',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="PtoDetails"
              component={PtoDetails}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'PtoDetails',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="LeaveDetails"
              component={LeaveDetails}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'LeaveDetails',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="KnowYourPension"
              component={KnowYourPension}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'KnowYourPension',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="ViewPdf"
              component={ViewPdf}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'ViewPdf',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="GrievanceProgress"
              component={GrievanceProgress}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'GrievanceProgress',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
            <Stack.Screen
              name="DgGrievanceProgress"
              component={DgGrievanceProgress}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'DgGrievanceProgress',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
             <Stack.Screen
              name="Chatgpt"
              component={Chatgpt}
              initialParams={{theme: useTheme().theme}}
              options={{
                title: 'Chatgpt',
                animationTypeForReplace: 'push',
                animation: 'none',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </ThemeProvider>
  );
}
export default NavContainer;
