import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
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
import StormSurge from "./pages/Dashboard/riverMonitoring";
import AlertManagement from "./pages/Dashboard/AlertManagement";
import PendingChats from "./pages/Dashboard/PendingChats";

import ManageUsers from "./pages/Dashboard/ManageUsers";
import BuoyDeployment from "./pages/Management/BuoyDeployment";
import ChatSupport from "./pages/Management/ChatSupport";
import AlertSystem from "./pages/Management/AlertSystem";
import CustomSlider from "./pages/Customization/CustomSlider";
import CustomAboutUs from "./pages/Customization/CustomAboutUs";
import CustomPrototype from "./pages/Customization/CustomPrototype";
import CustomTeam from "./pages/Customization/CustomTeam";
import CustomFAQs from "./pages/Customization/CustomFAQs";
import CustomFeedback from "./pages/Customization/CustomFeedback";
import CustomFooter from "./pages/Customization/CustomFooter";
import ArchiveSlider from "./pages/Archive/ArchiveSlider";
import ArchiveAboutUs from "./pages/Archive/ArchiveAboutUs";
import ArchivePrototype from "./pages/Archive/ArchivePrototype";
import ArchiveTeam from "./pages/Archive/ArchiveTeam";
import ArchiveFAQs from "./pages/Archive/ArchiveFAQs";
import ArchiveFeeback from "./pages/Archive/ArchiveFeeback";
import ArchiveFooter from "./pages/Archive/ArchiveFooter";
import ArchiveUsers from "./pages/Archive/ArchiveUsers";
import ArchiveBuoys from "./pages/Archive/ArchiveBuoys";
import Loader from "./common/Loader";
import DeployedBuoy from "./pages/Dashboard/deployedBuoy";
import HistoricalDashboard from "./pages/Dashboard/historicalDashboard";

// Add these imports for your customization components
import CustomizationSlider from "./components/admin/customization-slider";
import CustomizationAbout from "./components/admin/customization-about";
import CustomizationPrototype from "./components/admin/customization-prototype";
import CustomizationFaqs from "./components/admin/customization-faqs";
import CustomizationTeam from "./components/admin/customization-team";
import CustomizationFooter from "./components/admin/customization-footer";
import CustomizationFeedbacks from "./components/admin/customization-feedbacks";
import CustomizationArchive from "./components/admin/customization-archive";
import { AlertsContainerRef } from "./components/Alert/AlertsContainer";
import UserRoute from "./middleware/UserRoute";
import ProtectedRoute from "./middleware/ProtectedRoute";

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
            path="/admin/alert-management"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <AlertManagement />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="/admin/pending-chats"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <PendingChats />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="/admin/manage-users"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />

          <Route
            index
            path="/admin/deployed-buoy"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <DeployedBuoy />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="/admin/dashboard"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="/admin/river-monitoring"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <StormSurge />
              </ProtectedRoute>
            }
          />
          <Route
            index
            path="/admin/historical-data"
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
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Management */}
          <Route
            path="/admin/manage-users"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-buoys"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <BuoyDeployment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/chat-support"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <ChatSupport />
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

          {/* Customization */}
          <Route
            path="/admin/customization/sliders"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomSlider />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization/about-us"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomAboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization/prototype"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomPrototype />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization/teams"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomTeam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization/faqs"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomFAQs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization/feedbacks"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/customization/footer"
            element={
              <ProtectedRoute alertsRef={alertsRef}>
                <CustomFooter />
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
            element={<CustomizationSlider />}
          />
          <Route
            path="/admin/customization-about"
            element={<CustomizationAbout />}
          />
          <Route
            path="/admin/customization-prototype"
            element={<CustomizationPrototype />}
          />
          <Route
            path="/admin/customization-faqs"
            element={<CustomizationFaqs />}
          />
          <Route
            path="/admin/customization-team"
            element={<CustomizationTeam />}
          />
          <Route
            path="/admin/customization-footer"
            element={<CustomizationFooter />}
          />
          <Route
            path="/admin/customization-feedbacks"
            element={<CustomizationFeedbacks />}
          />
          <Route
            path="/admin/customization-archive"
            element={<CustomizationArchive />}
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
        </Route>

        {/* Auth Layout */}
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

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
