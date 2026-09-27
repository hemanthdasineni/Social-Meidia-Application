import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, logout, fetchCurrentUser } =
    useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    setUser,
    logout,
    fetchCurrentUser,
  };
};
