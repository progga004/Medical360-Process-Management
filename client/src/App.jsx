import RegistrationForm from "./pages/RegistrationForm";
import LoginForm from "./pages/LoginForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import EditEquipmentPage from "./pages/EditEquipmentPage";
import AllStaffPage from "./pages/AllStaffPage";
import AppointmentPage from "./pages/AppointmentPage";
import EditRoomPage from "./pages/EditRoomPage";
import DepartmentPage from "./pages/DepartmentPage";
import DepartmentStaffPage from "./pages/DepartmentStaffPage";
import AllDoctorsPage from "./pages/AllDoctorsPage";
import AppPage from "./pages/AppPage";
import NewEquipmentPage from "./pages/NewEquipmentPage";
import NewRoomPage from "./pages/NewRoomPage";
import NewPatientPage from "./pages/NewPatientPage";
import ResourceManagementPage from "./pages/ResourceManagementPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import BugReport from "./pages/BugReportForm";
import FeedbackForm from "./pages/FeedbackForm";
import CancelAppointmentForm from "./pages/CancelAppointmentForm";
import UnscheduledAppointments from "./pages/UnscheduledApptPage";
import AllEquipmentPage from "./pages/AllEquipmentPage";
import EditPatientInfoPage from "./pages/EditPatientInfoPage";
import EmergencyReassignment from "./pages/EmergencyAssignmentPage";
import DepartmentRatioPage from "./pages/DepartmentRatioPage";
import PatientInfo from "./pages/PatientInfo";
import DoctorInfo from "./pages/DoctorInfo";
import AllRoomsPage from "./pages/AllRoomsPage";
import AllPatientPage from "./pages/AllPatientPage";
import EditPatientPage from "./pages/EditPatientPage";
import PatientNotification from "./pages/PatientNotification";
import AllUsersPage from "./pages/AllUsersPage";
import EditUserPage from "./pages/EditUserPage";

import DepartmentForm from "./pages/DepartmentForm";
import { useAuthContext } from "./hooks/useAuthContext";
import { useGlobalContext } from "./hooks/useGlobalContext";
import AddProcedurePage from "./pages/AddProcedurePage";
import UserInfoPage from "./pages/UserInfo";
import MyPatientsPage from "./pages/MyPatientsPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import AllFeedbacksPage from "./pages/AllFeedbacksPage";
import AllBugsPage from "./pages/AllBugsPage";
import MyCalendar from "./pages/MyCalendar";
import BugInfoPage from "./pages/BugInfoPage";
import FeedbackInfoPage from "./pages/FeedbackInfoPage";

function App() {

  const { user } = useAuthContext();
  let lastRoute = localStorage.getItem("lastRoute");
  if (!lastRoute)
    lastRoute = "/apppage"

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <HomePage /> : <Navigate to={lastRoute}/>} />
        <Route path="/apppage" element={user ? <AppPage /> : <Navigate to="/" />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={!user ? <LoginForm /> : <Navigate to={lastRoute}/>} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/all-staff" element={<AllStaffPage />} />
        <Route path="/all-equipments" element={user ? <AllEquipmentPage  /> : <Navigate to="/" />} />
        <Route path="/all-rooms" element={user ? <AllRoomsPage /> : <Navigate to="/" />} />
        <Route path="/all-patients" element={user ? <AllPatientPage /> : <Navigate to="/" />} />
        <Route path="/all-users" element={user ? <AllUsersPage /> : <Navigate to="/" />} />
        <Route path="/book-appointment" element={<AppointmentPage />} />
        <Route path="/all-doctors" element={user ? <AllDoctorsPage /> : <Navigate to="/" />} />
        <Route path="/edit-equipment/" element={<EditEquipmentPage />} />
        <Route path="/edit-room/" element={<EditRoomPage />} />
        <Route path="/edit-patient" element={<EditPatientPage />} />
        <Route path="/edit-user" element={<EditUserPage />} />
        <Route path="/department-staff/:id" element={<DepartmentStaffPage />} />
        <Route path="/departmentpage" element={user ? <DepartmentPage /> : <Navigate to="/" />} />
        <Route path="/new-equipment" element={<NewEquipmentPage />} />
        <Route path="/new-room" element={<NewRoomPage />} />
        <Route path="/new-patient" element={<NewPatientPage />} />
        <Route
          path="/resource-management"
          element={<ResourceManagementPage />}
        />
        <Route path="/doctor-schedule/:userId" element={<MyCalendar />} />
        <Route path="/user-schedule/:userId" element={<MyCalendar />} />
        <Route path="/bugs" element={<BugReport />} />
        <Route path="/view-bug/:id" element={<BugInfoPage />} />
        <Route path="/view-feedback/:id" element={<FeedbackInfoPage />} />

        <Route path="/feedback" element={<FeedbackForm />} />
        <Route
          path="/cancel-appointment"
          element={<CancelAppointmentForm />}
        />
        <Route path="/unscheduled" element={<UnscheduledAppointments />} />
        <Route
          path="/resource-management"
          element={<ResourceManagementPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/edit-patient-user-info"
          element={<EditPatientInfoPage />}
        />
        <Route path="/add-procedure" element={user ? <AddProcedurePage /> : <Navigate to="/" />} />
        {/* <Route path="/patient-info" element={user ? <PatientInfo /> : <Navigate to="/" />} /> */}
        <Route path="/doctorinfo/:doctorId" element={<DoctorInfo />} />
        {/* <Route path="/doctor-schedule/:userId" element={<MyCalendar />} /> */}
        <Route path="/patient-info/:id" element={<PatientInfo />} />
        <Route path="/user-info/:id" element={<UserInfoPage />} />
        <Route path="/emergency" element={<EmergencyReassignment />} />
        <Route path="/departmentratio" element={<DepartmentRatioPage />} />
        <Route path="/admin-notification" element={<PatientNotification />} />
            <Route path="/department-form" element={< DepartmentForm/>} />
        <Route path="/change-password/:id" element={<ChangePasswordPage />} />
        <Route path="my-patients" element={user ? <MyPatientsPage /> : <Navigate to="/" />} />
        <Route path="/all-feedbacks" element={user ? <AllFeedbacksPage /> : <Navigate to="/" />} />
        <Route path="/all-bugs" element={user ? <AllBugsPage /> : <Navigate to="/" />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
