/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import API_BASE_URL from "../config/coreApi";
import CryptoJS from "crypto-js";
import { createEcho } from "../echo";
import Echo from "laravel-echo";

interface UserType {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  houseNo?: string;
  street?: string;
  municipality?: string | null;
  isActive?: boolean;
  registrationStatus?: boolean;
  userType?: string;
  image?: string;
  idDocument?: string;
  verifiedBy?: number;
  dateVerified?: string;
  emailVerifiedAt?: string;
  verifier?: {
    id: number;
    name: string;
  };
  barangay?: {
    id: number;
    name: string;
    number: number;
    buoys?: Array<{
      id: number;
      buoyCode: string;
      riverName: string;
      status: string;
    }>;
  };
}
// Define context shape
interface AppContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  encryptedToken: string | null;
  setEncryptedToken: Dispatch<SetStateAction<string | null>>;
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  echoInstance: Echo<any> | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

interface MyComponentProps {
  children: ReactNode;
}

export default function AppProvider({ children }: MyComponentProps) {
  const SECRET_KEY = "my-secret-key";

  const [encryptedToken, setEncryptedToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [echoInstance, setEchoInstance] = useState<Echo<any> | null>(null);

  // ✅ Decrypt token once when encryptedToken changes
  useEffect(() => {
    if (encryptedToken) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        setToken(decrypted || null);
      } catch (error) {
        console.error("Failed to decrypt token:", error);
        setToken(null);
        setLoading(false); // ✅ Stop loading on decrypt error
      }
    } else {
      setToken(null);
      setLoading(false); // ✅ Stop loading when no token exists
    }
  }, [encryptedToken]);

  // ✅ Fetch user data with token
  useEffect(() => {
    async function getUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/information/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          setUser(null);
          // ✅ Clear invalid token from localStorage
          localStorage.removeItem("token");
          setEncryptedToken(null);
        } else {
          const response = await res.json();
          setUser(response.data);
          console.log("User:", response.data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoading(false); // ✅ Always stop loading
      }
    }

    getUser();
  }, [token]);

  // Initialize Echo once user & token are available
  useEffect(() => {
    if (!token || !user) return;

    const echo = createEcho(token);
    setEchoInstance(echo);

    const pusher = echo.connector.pusher;

    // Connection status monitoring
    pusher.connection.bind("connected", () =>
      console.log("✅ Pusher connected")
    );
    pusher.connection.bind("connected", () => {
      console.log(
        "✅ Pusher connected, socket ID:",
        pusher.connection.socket_id
      );
    });
    pusher.connection.bind("disconnected", () =>
      console.log("❌ Pusher disconnected")
    );
    pusher.connection.bind("error", (err: any) =>
      console.error("❌ Pusher error:", err)
    );

    pusher.connection.bind("state_change", (states: any) =>
      console.log(
        "🔄 Pusher state change:",
        states.previous,
        "→",
        states.current
      )
    );

    return () => {
      echo.disconnect();
    };
  }, [token, user]);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        encryptedToken,
        setEncryptedToken,
        user,
        setUser,
        loading,
        setLoading,
        echoInstance,
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
}
