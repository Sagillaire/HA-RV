import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../stores/types";
import { useAuthStore } from "../stores/userStore";

interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isSignedIn } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoginPage = location.pathname === "/login";

    if (!isSignedIn && !isLoginPage) {
      navigate("/login");
      return;
    }

    if (isSignedIn && isLoginPage) {
      navigate("/");
      return;
    }

    console.log("Usuario autenticado (contexto):", user);
  }, [isSignedIn, user, location, navigate]);

  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
};
