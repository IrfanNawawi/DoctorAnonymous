export type UserRegisterData = {
  userId: string;
  fullname: string;
  profession: string;
  email: string;
  deviceId: string;
  devicePlatform: string;
};

export type RootStackParamList = {
  Splash: undefined;
  Dashboard: undefined;
  Login: undefined;
  Register: undefined;
  UploadPhoto: { user: UserRegisterData };
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