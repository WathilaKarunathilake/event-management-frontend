import { createContext, useContext, useEffect, useState } from "react";
import type { Role, User } from "@/models/AuthModel";
import { handleGettingJwtInfo, handleLogout } from "@/services/AuthService";
import {
  startNotificationHub,
  stopNotificationHub,
  type NotificationMessage,
} from "@/services/NotificationService";
import { showInfoToast, showSuccessToast } from "@/components/files/toast";
import { getItem, setItem } from "@/storage/Storage";
import useSound from 'use-sound';

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
  hasRole: (role: Role) => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let globalLogout: ((msg?: string) => void) | null = null;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const notificationSoundUrl = 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg';
  const [play] = useSound(notificationSoundUrl);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await handleGettingJwtInfo();
      setUser(response);
    } catch (error) {
      console.error("Failed to get user details", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    startNotificationHub((message: NotificationMessage) => {
      showInfoToast(message.subject, message.content);
       play();
    });

    return () => {
      stopNotificationHub();
    };
  }, [user, play]);

  const login = async () => {
    try {
      await getUserDetails();
      setItem("lg", "true")
    } catch (e) {
      console.error("Login error", e);
    }
  };

  const logout = async (msg?: string) => {
    const response = await handleLogout();
    if (getItem("lg") === "true") {
      showSuccessToast(msg ?? response);
      setItem("lg", "false")
    }
    setUser(null);
  };

  const hasRole = (role: Role) => user?.role.includes(role) ?? false;

  useEffect(() => {
    globalLogout = logout;
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used in AuthProvider");
  return ctx;
};

export function logoutUser(msg?: string) {
  if (globalLogout) globalLogout(msg);
}
