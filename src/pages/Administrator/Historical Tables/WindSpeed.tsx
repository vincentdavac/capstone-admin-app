import { useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import WindSpeedComponentCard from "./WindSpeed/WindSpeedComponentCard";

const WindSpeed = () => {
  useEffect(() => {
    document.title = "Wind Speed | X-Stream";
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle="Wind Speed" />
      <div className="space-y-6">
        <WindSpeedComponentCard />
      </div>
    </>
  );
};

export default WindSpeed;
