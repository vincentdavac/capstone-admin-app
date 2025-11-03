/* eslint-disable @typescript-eslint/no-unused-vars */
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

interface UserType {
  id?: number;
  attributes?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    contactNumber?: string;
    houseNo?: string;
    street?: string;
    barangay?: string;
    municipality?: string;
    isAdmin?: string;
    image?: string;
    imageUrl?: string;
    createdDate?: string;
    createdTime?: string;
    updatedDate?: string;
    updatedTime?: string;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
