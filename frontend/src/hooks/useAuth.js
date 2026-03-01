import { useAuthContext } from '../context/AuthContext.jsx';
import { apiClient } from '../api/client.js';

export function useAuth() {
  const { token, isAuthenticated, login, logout } = useAuthContext();

  const signIn = async (username, password) => {
    const res = await apiClient.post('/auth/login', { username, password });
    login(res.data.token);
  };

  return { token, isAuthenticated, signIn, logout };
}
