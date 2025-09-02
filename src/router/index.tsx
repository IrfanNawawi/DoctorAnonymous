import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNavigator } from "../components";
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
import { RootStackParamList } from "../types/navigation";
import { colors } from "../utils";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  const TabContent = (
    <Tab.Navigator
      tabBar={(props) => <BottomNavigator {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Doctor" component={Doctor} />
      <Tab.Screen name="Consultation" component={Consultation} />
      <Tab.Screen name="Hospitals" component={Hospitals} />
    </Tab.Navigator>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {TabContent}
    </SafeAreaView>
  );
};


export default function Router() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="ChooseDoctor" component={ChooseDoctor} />
        <Stack.Screen name="Chatting" component={Chatting} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.white
    },
})