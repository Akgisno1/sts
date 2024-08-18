"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies"; // Assuming you're using nookies or similar library

interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  onboardingCompleted: boolean;
  notifications: number;
}

interface AuthContextProps {
  currentUser: User | null;
  updateUser: (data: User | null) => void;
  verifyToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null
  );

  const updateUser = (data: User | null) => {
    setCurrentUser(data);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    } else {
      localStorage.removeItem("user");
    }
  };

  const verifyToken = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies.token; // Adjust this if your token cookie has a different name
      if (!token) {
        throw new Error("Not Authenticated!");
      }

      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string
      ) as User;

      // Update state and local storage with the payload
      updateUser(payload);
    } catch (error) {
      console.error("Token verification failed:", error);
      updateUser(null);
    }
  };

  useEffect(() => {
    // Re-verify the token on each page refresh
    if (!currentUser) {
      verifyToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
