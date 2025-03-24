import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/userStore';
import { AuthContext } from './useAuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isSignedIn } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoginPage = location.pathname === '/login';

    if (!isSignedIn && !isLoginPage) {
      navigate('/login');
      return;
    }

    if (isSignedIn && isLoginPage) {
      navigate('/');
      return;
    }

    console.log('Usuario autenticado (contexto):', user);
  }, [isSignedIn, user, location, navigate]);

  return (
    <AuthContext.Provider value={{ user, isSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
