import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dashboard, Login, Register, Splash, UploadPhoto } from "../pages";

export type RootStackParamList = {
  Splash: undefined;
  Dashboard: undefined;
  Login: undefined;
  Register: undefined;
  UploadPhoto: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  return (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}