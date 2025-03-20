import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { isLoading, handleLogin } = useAuth();

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </div>
  );
};

export default LoginPage;
