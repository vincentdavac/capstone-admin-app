import { useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import BatteryHealthComponentCard from "./BatteryHeath/BatteryHealthComponentCard";

const BatteryHealth = () => {
  useEffect(() => {
    document.title = "Battery Health | X-Stream";
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle="Battery Health" />
      <div className="space-y-6">
        <BatteryHealthComponentCard />
      </div>
    </>
  );
};

export default BatteryHealth;
