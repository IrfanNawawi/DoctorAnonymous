import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Consultation, Dashboard, Doctor, Hospitals, Login, Register, Splash, UploadPhoto } from "../pages";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigator } from "../components";

export type RootStackParamList = {
  Splash: undefined;
  Dashboard: undefined;
  Login: undefined;
  Register: undefined;
  UploadPhoto: undefined;
  MainApp: undefined;
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
    </Stack.Navigator>
  )
}