import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { login, logout, checkAuth } from "@/store/actions/authActions";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, loading, user, error } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogin = async (username: string, password: string) => {
    const success = await dispatch(login({ username, password })).unwrap();
    if (success) router.push("/products");
    return success;
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const checkAuthAndRedirect = (
    redirectIfAuth = false,
    redirectPath = "/login"
  ) => {
    if (isAuthenticated && redirectIfAuth) {
      router.push("/products");
    } else if (!isAuthenticated && !redirectIfAuth) {
      router.push(redirectPath);
    }
  };

  return {
    isAuthenticated,
    isLoading: loading,
    user,
    error,
    login: handleLogin,
    logout: handleLogout,
    checkAuthAndRedirect,
  };
}
