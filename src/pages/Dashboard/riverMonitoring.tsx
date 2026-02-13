import SearchBuoy from "../../components/riverMonitoring/search";
import MapsWithHazard from "../../components/riverMonitoring/maps_w_hazard";
import { useEffect, useContext } from "react";
import { insertingAlerts } from "../../api_hooks/dashboardHooks";
import { useAlertMonitor } from "../../api_hooks/alertMonitoringHooks";
import { AppContext } from "../../context/AppContext";
import AlertModal from "../Barangay/AlertManagement/alertModal";
const riverMonitoring = () => {
  insertingAlerts();
  useEffect(() => {
    document.title = "River Monitoring | X-Stream";
  }, []);
  const { user } = useContext(AppContext)!;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    5000,
    buoyId?.toString() ?? "",
  );
  return (
    <div className="">
      <SearchBuoy />
      <MapsWithHazard />
      <AlertModal
        isOpen={showAlert}
        alert={currentAlert}
        onClose={handleClose}
      />
    </div>
  );
};
export default riverMonitoring;
