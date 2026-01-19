import { buoyData, getBuoyByid } from "../core_api_fetching/getBuoy";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ref, onValue } from "firebase/database";
import { database, auth } from "../firebaseCredentials/firebase";
import { signInAnonymously } from "firebase/auth";
interface BuoysData {
  data: buoyData | null;
  loading: boolean;
  error: string | null;
  currentLat: any
  currentLng: any

}
export const buoyDataHooks = (): BuoysData => {
  const [data, setData] = useState<buoyData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLat, setCurrentLat] = useState<number | null>(null);
  const [currentLng, setCurrentLng] = useState<number | null>(null);
  const { token, user } = useContext(AppContext)!;
  const buoyId = user?.barangay?.buoys?.[0]?.id ?? 0;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
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
    return () => {
      unsubLat();
      unsubLng();
 
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
  console.log("firebase data", currentLat);
  
  const fetchBuoy = async (signal: AbortSignal) => {
    if (!buoyId || !token) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const result = await getBuoyByid.fetchBuoyById(
        Number(buoyId),
        token,
        signal,
      );
      if (!signal.aborted) {
        setData(result);
        console.log("testettetete",result);
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        console.log("Fetch aborted");
        return;
      }
      if (!signal.aborted) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch prototype";
        setError(errorMessage);
        console.error("Error fetching prototype:", err);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchBuoy(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [buoyId, token]);

  return {
    data,
    loading,
    error,
    currentLat,
    currentLng
  };
};
