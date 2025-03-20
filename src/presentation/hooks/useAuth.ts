import { User } from "../../infrastructure/state/stores/types";
import { useAuthStore } from "../../infrastructure/state/stores/userStore";

export const useAuth = () => {
  const { user, isSignedIn, isLoading, login, logout, setLoading } =
    useAuthStore();

  const handleLogin = async () => {
    setLoading(true);

    setTimeout(() => {
      const mockUser = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        status: "active",
      };
      const mockToken = "fake-token";
      login(mockUser as User, mockToken);
    }, 1000);
  };

  const handleLogout = () => logout();

  return { user, isSignedIn, isLoading, handleLogin, handleLogout };
};
