import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


import {  Routes, Route } from "react-router";
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
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import TsunamiDashboard from "./pages/Dashboard/TsunamiDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import StormSurge from "./pages/Dashboard/storm_surge";
import ManageUsers from "./pages/Management/ManageUsers";
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
import Loader from './common/Loader';
import TropicalCycone from "./pages/Dashboard/tropical_cyclone";

export default function App() {
  
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
    title="Coastella Admin" 
    description="Please wait while loading..."  />
  ) :(
    <>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/admin-dashboard" element={<Home />} />

            <Route
              index
              path="/TsunamiDashboard"
              element={<TsunamiDashboard />}
            />
            <Route
              index
              path="/tropical-cyclone"
              element={<TropicalCycone />}
            />
            <Route index path="/dashboard" element={<Dashboard />} />
            <Route index path="/storm-surge" element={<StormSurge />} />
            <Route index element={<Home />} />

            <Route index path="/admin/dashboard" element={<Home />} />
            
            {/* Management */}
            <Route path="/admin/manage-users" element={<ManageUsers />} />
            <Route path="/admin/manage-buoys" element={<BuoyDeployment />} />
            <Route path="/admin/chat-support" element={<ChatSupport />} />
            <Route path="/admin/alert-system" element={<AlertSystem />} />

            {/* Customization */}
            <Route path="/admin/customization/sliders" element={<CustomSlider />} />
            <Route path="/admin/customization/about-us" element={<CustomAboutUs />} />
            <Route path="/admin/customization/prototype" element={<CustomPrototype />} />
            <Route path="/admin/customization/teams" element={<CustomTeam />} />
            <Route path="/admin/customization/faqs" element={<CustomFAQs />} />
            <Route path="/admin/customization/feedbacks" element={<CustomFeedback />} />
            <Route path="/admin/customization/footer" element={<CustomFooter />} />

            {/* Archive */}
            <Route path="/admin/archive/users" element={<ArchiveUsers />} />
            <Route path="/admin/archive/buoys" element={<ArchiveBuoys />} />
            <Route path="/admin/archive/sliders" element={<ArchiveSlider />} />
            <Route path="/admin/archive/about-us" element={<ArchiveAboutUs />} />
            <Route path="/admin/archive/prototype" element={<ArchivePrototype />} />
            <Route path="/admin/archive/teams" element={<ArchiveTeam />} />
            <Route path="/admin/archive/faqs" element={<ArchiveFAQs />} />
            <Route path="/admin/archive/feedbacks" element={<ArchiveFeeback />} />
            <Route path="/admin/archive/feedbacks" element={<ArchiveFeeback />} />
            <Route path="/admin/archive/footer" element={<ArchiveFooter />} />
            


            {/* Others Page */}
            <Route path="/admin-profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

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
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}
