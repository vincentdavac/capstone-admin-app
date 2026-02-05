import { useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import BME280DataComponentCard from "./BME280/BME280DataComponentCard";

const BME280Data = () => {
  useEffect(() => {
    document.title = "BME280 Data | X-Stream";
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle="BME280 Data" />
      <div className="space-y-6">
        <BME280DataComponentCard />
      </div>
    </>
  );
};

export default BME280Data;
