import { createContext, useContext } from 'react';
import { User } from '../stores/types';

interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de un AuthProvider');
  }
  return context;
};
