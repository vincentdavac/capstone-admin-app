import { useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import MS5837DataComponentCard from "./MS5837/MS5837DataComponentCard";

const MS5837Data = () => {
  useEffect(() => {
    document.title = "Battery Health | X-Stream";
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle="MS5837 Data" />
      <div className="space-y-6">
        <MS5837DataComponentCard />
      </div>
    </>
  );
};

export default MS5837Data;
