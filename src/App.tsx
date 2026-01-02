import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/Administrator/SignIn";
import SignUp from "./pages/AuthPages/Administrator/SignUp";
import ForgotPasswordPage from "./pages/AuthPages/Administrator/ForgotPassword";
import ResetPassword from "./pages/AuthPages/Administrator/ResetPassword";
//import VerifySuccess from "./pages/AuthPages/VerifySuccess";
import VerifySuccessPage from "./pages/AuthPages/Administrator/VerifySuccess";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Slider from "./pages/Slider";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Dashboard from "./pages/Dashboard/Dashboard";
import BarangayDashboard from "./pages/Dashboard/BarangayDashboard";
import StormSurge from "./pages/Dashboard/riverMonitoring";
import AlertManagement from "./pages/Barangay/AlertManagement/AlertManagement";
import ChatSupport from "./pages/Administrator/Chat/AdminChatSupport";

import ManageUsers from "./pages/Administrator/ManageUsers/ManageUsers";
import ArchivedUsers from "./pages/Administrator/Archive/Users/ArchivedUsers";
import BuoyDeployment from "./pages/Administrator/Management/BuoyDeployment/BuoyDeployment";
// import ChatSupport from "./pages/Management/ChatSupport";
import AlertSystem from "./pages/Management/AlertSystem";
import ArchiveSlider from "./pages/Barangay/Archive/ArchiveSlider";
import ArchiveAboutUs from "./pages/Barangay/Archive/ArchiveAboutUs";
import ArchivePrototype from "./pages/Barangay/Archive/ArchivePrototype";
import ArchiveTeam from "./pages/Barangay/Archive/ArchiveTeam";
import ArchiveFAQs from "./pages/Barangay/Archive/ArchiveFAQs";
import ArchiveFeeback from "./pages/Barangay/Archive/ArchiveFeeback";
import ArchiveFooter from "./pages/Barangay/Archive/ArchiveFooter";
import ArchiveUsers from "./pages/Barangay/Archive/ArchiveUsers";
import ArchiveBuoys from "./pages/Barangay/Archive/ArchiveBuoys";
import Loader from "./common/Loader";
import DeployedBuoy from "./pages/Dashboard/deployedBuoy";
import HistoricalDashboard from "./pages/Dashboard/historicalDashboard";

// Add these imports for your customization components
import CustomizationSlider from "./pages/Administrator/Customization/Slider/customization-slider";
import CustomizationAbout from "./pages/Administrator/Customization/About/customization-about";
import CustomizationPrototype from "./pages/Administrator/Customization/Prototype/customization-prototype";
import CustomizationFaqs from "./pages/Administrator/Customization/FAQs/customization-faqs";
import CustomizationTeam from "./pages/Administrator/Customization/Team/customization-team";
import CustomizationFooter from "./pages/Administrator/Customization/Footer/customization-footer";
import CustomizationFeedbacks from "./pages/Administrator/Customization/Feedback/customization-feedbacks";
import { AlertsContainerRef } from "./components/Alert/AlertsContainer";
import UserRoute from "./middleware/UserRoute";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Barangay from "./pages/Administrator/Management/Barangay/Barangay";
import BarangayChatSupport from "./pages/Barangay/Chat/BarangayChatSupport";
import BarangaySignUp from "./pages/AuthPages/Barangay/BarangaySignUp";
import BarangaySignIn from "./pages/AuthPages/Barangay/BarangaySignIn";
import BarangayForgotPassword from "./pages/AuthPages/Barangay/BarangayForgotPassword";

// HIstorical Table
import SurroundingTable from "./pages/Administrator/Historical Tables/SurroundingTable";
import HumidityTable from "./pages/Administrator/Historical Tables/HumidityTable";
import WaterMonitoring from "./pages/Administrator/Historical Tables/WaterMonitoring";
import RainMonitoring from "./pages/Administrator/Historical Tables/RainMonitoring";
import AtmosphericPressure from "./pages/Administrator/Historical Tables/AtmosphericPressure";
import WindSpeed from "./pages/Administrator/Historical Tables/WindSpeed";
import WaterDepth from "./pages/Administrator/Historical Tables/WaterDepth";
import RainGauge from "./pages/Administrator/Historical Tables/RainGauge";
import FeedbackArchivedTable from "./pages/Administrator/Archive/Feedbacks/FeedbackArchivedTable";
import BarangayManageUsers from "./pages/Barangay/ManageUsers/BarangayManageUsers";
import BarangayArchivedUsers from "./pages/Barangay/Archive/Users/BarangayArchivedUsers";
import BarangayProtectedRoutes from "./middleware/BarangayProtectedRoutes";
import HotlinesArchivedTable from "./pages/Administrator/Archive/Hotlines/HotlinesTable";

interface AppProps {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

export default function App({ alertsRef }: AppProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return loading ? (
    <Loader
      title="X-STREAM DASHBOARD"
      description="Please wait while loading..."
    />
  ) : (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout alertsRef={alertsRef} />}>
          <Route
            index
            path="/admin/manage-users"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <ManageUsers alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />

          <Route
            index
            path="/admin/archived-users"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <ArchivedUsers alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="/admin/archived-feedbacks"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <FeedbackArchivedTable alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="/admin/archived-hotlines"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <HotlinesArchivedTable alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="/admin/dashboard"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <Dashboard alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />

          <Route
            index
            path="/barangay/historical-data"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <HistoricalDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            index
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <Dashboard alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />

          {/* Management */}
          <Route
            path="/admin/manage-buoys"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <BuoyDeployment alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/barangay-management"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <Barangay alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chat-support"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <ChatSupport alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/alert-system"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <AlertSystem />
              </ProtectedRoute>
            }
          />
          {/* Archive */}
          <Route path="/admin/archive/users" element={<ArchiveUsers />} />
          <Route path="/admin/archive/buoys" element={<ArchiveBuoys />} />
          <Route path="/admin/archive/sliders" element={<ArchiveSlider />} />
          <Route path="/admin/archive/about-us" element={<ArchiveAboutUs />} />
          <Route
            path="/admin/archive/prototype"
            element={<ArchivePrototype />}
          />
          <Route path="/admin/archive/teams" element={<ArchiveTeam />} />
          <Route path="/admin/archive/faqs" element={<ArchiveFAQs />} />
          <Route path="/admin/archive/feedbacks" element={<ArchiveFeeback />} />
          <Route path="/admin/archive/archive" element={<ArchiveFeeback />} />
          <Route path="/admin/archive/footer" element={<ArchiveFooter />} />

          {/* Others Page */}
          <Route path="/admin-profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/slider" element={<Slider />} />

          {/* Customization Routes - ADD THESE */}
          <Route
            path="/admin/customization-slider"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomizationSlider alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization-about"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomizationAbout alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization-prototype"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomizationPrototype alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization-faqs"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomizationFaqs alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization-team"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomizationTeam alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization-footer"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomizationFooter alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization-feedbacks"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomizationFeedbacks alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />

          {/* Ui Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />

          {/*  BARANGAY ROUTES */}
          <Route
            index
            path="/barangay/dashboard"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <BarangayDashboard alertsRef={alertsRef} />
              </BarangayProtectedRoutes>
            }
          />

          <Route
            index
            path="/barangay/manage-users"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <BarangayManageUsers alertsRef={alertsRef} />
              </BarangayProtectedRoutes>
            }
          />

          <Route
            index
            path="/barangay/river-monitoring"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <StormSurge />
              </BarangayProtectedRoutes>
            }
          />
          <Route
            path="/barangay/chat-support"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <BarangayChatSupport alertsRef={alertsRef} />
              </BarangayProtectedRoutes>
            }
          />

          <Route
            index
            path="/barangay/alert-management"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <AlertManagement />
              </BarangayProtectedRoutes>
            }
          />

          <Route
            index
            path="/barangay/deployed-buoy"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <DeployedBuoy />
              </BarangayProtectedRoutes>
            }
          />

          {/* Historical data */}
          <Route
            path="/barangay/historical-data/surrounding-temperature"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <SurroundingTable />
              </BarangayProtectedRoutes>
            }
          />
          <Route
            path="/barangay/historical-data/humidity"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <HumidityTable />
              </BarangayProtectedRoutes>
            }
          />
          <Route
            path="/barangay/historical-data/water-temperature"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <WaterMonitoring />
              </BarangayProtectedRoutes>
            }
          />
          <Route
            path="/barangay/historical-data/rain-monitoring"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <RainMonitoring />
              </BarangayProtectedRoutes>
            }
          />
          <Route
            path="/barangay/historical-data/atmospheric-pressure"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <AtmosphericPressure />
              </BarangayProtectedRoutes>
            }
          />
          <Route
            path="/barangay/historical-data/windspeed-monitoring"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <WindSpeed />
              </BarangayProtectedRoutes>
            }
          />
          <Route
            path="/barangay/historical-data/water-level"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <WaterDepth />
              </BarangayProtectedRoutes>
            }
          />
          <Route
            path="/barangay/historical-data/rain-gauge"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <RainGauge />
              </BarangayProtectedRoutes>
            }
          />

          <Route
            index
            path="/barangay/archived-users"
            element={
              <BarangayProtectedRoutes alertsRef={alertsRef}>
                <BarangayArchivedUsers alertsRef={alertsRef} />
              </BarangayProtectedRoutes>
            }
          />
          <Route
            index
            path="/barangay/archived-hotlines"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <HotlinesArchivedTable alertsRef={alertsRef} />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ADMIN AUTHENTICATION */}
        <Route
          path="/admin/forgot-password"
          element={<ForgotPasswordPage alertsRef={alertsRef} />}
        />
        <Route
          path="/reset-password"
          element={<ResetPassword alertsRef={alertsRef} />}
        />
        <Route
          path="/admin/signin"
          element={
            <UserRoute alertsRef={alertsRef}>
              <SignIn alertsRef={alertsRef} />
            </UserRoute>
          }
        />
        <Route
          path="/admin/signup"
          element={
            <UserRoute alertsRef={alertsRef}>
              <SignUp alertsRef={alertsRef} />
            </UserRoute>
          }
        />
        <Route
          path="/verify-success"
          element={
            <UserRoute alertsRef={alertsRef}>
              <VerifySuccessPage />
            </UserRoute>
          }
        />

        {/* BARANGAY AUTHENTICATION */}
        <Route
          path="/barangay/signup"
          element={
            <UserRoute alertsRef={alertsRef}>
              <BarangaySignUp alertsRef={alertsRef} />
            </UserRoute>
          }
        />
        <Route
          path="/barangay/signin"
          element={
            <UserRoute alertsRef={alertsRef}>
              <BarangaySignIn alertsRef={alertsRef} />
            </UserRoute>
          }
        />
        <Route
          path="/barangay/forgot-password"
          element={<BarangayForgotPassword alertsRef={alertsRef} />}
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
