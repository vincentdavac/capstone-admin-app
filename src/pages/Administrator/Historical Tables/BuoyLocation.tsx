import { useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import BuoyLocationComponentCard from "./BuoyLocation/BuoyLocationComponentCard";

const BuoyLocation = () => {
  useEffect(() => {
    document.title = "Buoy Location | X-Stream";
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle="Buoy Location" />
      <div className="space-y-6">
        <BuoyLocationComponentCard />
      </div>
    </>
  );
};

export default BuoyLocation;
