import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { 
  Chatting, 
  ChooseDoctor, 
  Consultation, 
  Dashboard, 
  Doctor, 
  DoctorProfile, 
  Hospitals, 
  Login, 
  Register, 
  Splash, 
  UpdateProfile, 
  UploadPhoto, 
  UserProfile
} from "../pages";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigator } from "../components";

export type RootStackParamList = {
  Splash: undefined;
  Dashboard: undefined;
  Login: undefined;
  Register: undefined;
  UploadPhoto: undefined;
  MainApp: undefined;
  Doctor: undefined;
  Consultation: undefined;
  Hospitals: undefined;
  ChooseDoctor: undefined;
  Chatting: undefined;
  UserProfile: undefined;
  UpdateProfile: undefined;
  DoctorProfile: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainApp = () =>{
  return(
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Doctor" component={Doctor} options={{ headerShown: false }}/>
      <Tab.Screen name="Consultation" component={Consultation} options={{ headerShown: false }}/>
      <Tab.Screen name="Hospitals" component={Hospitals} options={{ headerShown: false }}/>
    </Tab.Navigator>
  )
}

export default function Router() {
  return (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerShown: false }}/>
        <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }}/>
        <Stack.Screen name="ChooseDoctor" component={ChooseDoctor} options={{ headerShown: false }}/>
        <Stack.Screen name="Chatting" component={Chatting} options={{ headerShown: false }}/>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="DoctorProfile" component={DoctorProfile} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}