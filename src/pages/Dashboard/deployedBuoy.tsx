/* eslint-disable react-hooks/rules-of-hooks */
import MapsWithHazard from "../../components/deployedBuoy/maps_w_buoyControl";
import BuoyCondition from "../../components/deployedBuoy/buoyCondition";
import { useContext, useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { insertingAlerts } from "../../api_hooks/dashboardHooks";
import { AppContext } from "../../context/AppContext";
import { ref, onValue } from "firebase/database";
import { database, auth } from "../../firebaseCredentials/firebase";
import { signInAnonymously } from "firebase/auth";

import API_BASE_URL from "../../config/coreApi";

interface BuoyAttributes {
  buoyCode: string;
  riverName: string;
  wallHeight: number;
  riverHectare: number;
  latitude: number;
  longitude: number;
  attachment: string | null;
  status: string;
  maintenanceAt: string | null;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

interface BuoyData {
  id: number;
  attributes: BuoyAttributes;
}

interface BuoyResponse {
  status: "success" | "error";
  message: string;
  data: BuoyData;
}

const tropicalPage = () => {
  const { token, user } = useContext(AppContext)!;

  const buoyId = user?.barangay?.buoys?.[0]?.id ?? 0;

  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;

  const [buoyData, setBuoyData] = useState<BuoyResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [distanceKm, setDistanceKm] = useState("0.00");

  const [currentLat, setCurrentLat] = useState<number | null>(null);
  const [currentLng, setCurrentLng] = useState<number | null>(null);
  const [batteryPercentage, setBatteryPercentage] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!buoyCode) return;

    const latRef = ref(database, `/${buoyCode}/GPS/LATITUDE`);
    const lngRef = ref(database, `/${buoyCode}/GPS/LONGITUDE`);
    const batteryRef = ref(database, `/${buoyCode}/BATTERY/PERCENTAGE`);

    const unsubLat = onValue(latRef, (snapshot) => {
      if (snapshot.exists()) {
        setCurrentLat(Number(snapshot.val()));
      }
    });

    const unsubLng = onValue(lngRef, (snapshot) => {
      if (snapshot.exists()) {
        setCurrentLng(Number(snapshot.val()));
      }
    });

    const unsubBattery = onValue(batteryRef, (snapshot) => {
      if (snapshot.exists()) {
        setBatteryPercentage(Number(snapshot.val()));
      }
    });

    return () => {
      unsubLat();
      unsubLng();
      unsubBattery();
    };
  }, [buoyCode]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Authentication", user);
      } else {
        signInAnonymously(auth);
      }
    });

    return unsubscribe;
  }, []);

  insertingAlerts(); // run on mount

  const fetchBuoyById = async (buoyId: number, token: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/deployment-point/${buoyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      return data; // BuoyResponse type
    } catch (error) {
      console.error("Error fetching buoy:", error);
      throw error;
    }
  };

  useEffect(() => {
    document.title = "Deployed Buoy | X-Stream";

    const getBuoy = async () => {
      if (!token || !buoyId) return;

      setLoading(true);
      try {
        const data: BuoyResponse = await fetchBuoyById(buoyId, token);
        setBuoyData(data);
      } catch (error) {
        console.error("Failed to fetch buoy data:", error);
      } finally {
        setLoading(false);
      }
    };

    getBuoy();
  }, [token, buoyId]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 h-[80vh] flex items-center justify-center">
        <div className="flex justify-center items-center gap-2 text-gray-500">
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
          Please wait while loading...
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <PageBreadcrumb
        pageTitle={buoyData?.data.attributes.buoyCode ?? "Deployed Buoy"}
      />

      <MapsWithHazard
        buoy={buoyData?.data.attributes}
        loading={loading}
        onDistanceChange={setDistanceKm}
        currentLat={currentLat}
        currentLng={currentLng}
      />
      <BuoyCondition
        buoy={buoyData?.data.attributes}
        loading={loading}
        distanceKm={distanceKm}
        currentLat={currentLat}
        currentLng={currentLng}
        batteryPercentage={batteryPercentage}
      />
    </div>
  );
};

export default tropicalPage;
