import { useEffect,useContext } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import MS5837DataComponentCard from "./MS5837/MS5837DataComponentCard";
import { insertingAlerts } from "../../../api_hooks/dashboardHooks";
import { useAlertMonitor } from "../../../api_hooks/alertMonitoringHooks";
import { AppContext } from "../../../context/AppContext";
import AlertModal from "../../Barangay/AlertManagement/alertModal";
const MS5837Data = () => {
  useEffect(() => {
    document.title = "Battery Health | X-Stream";
  }, []);
  insertingAlerts();
  const { user } = useContext(AppContext)!;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    5000,
    buoyId?.toString() ?? "",
  );
  return (
    <>
      <PageBreadcrumb pageTitle="MS5837 Data" />
      <div className="space-y-6">
        <MS5837DataComponentCard />
        <AlertModal
          isOpen={showAlert}
          alert={currentAlert}
          onClose={handleClose}
        />
      </div>
    </>
  );
};

export default MS5837Data;
