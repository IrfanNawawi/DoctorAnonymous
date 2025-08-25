import { CategoryData, DoctorData } from "./doctors";
import { UserRegisterData } from "./users";

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
  ChooseDoctor: { category: CategoryData };
  Chatting: { doctor: DoctorData };
  UserProfile: undefined;
  UpdateProfile: undefined;
  DoctorProfile: { doctor: DoctorData};
}