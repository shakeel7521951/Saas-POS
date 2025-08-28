import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useVerifyTokenQuery,
  useGetMeQuery,
} from "../store/api/authApi";
import {
  loginSuccess,
  logout as logoutAction,
  setError,
  clearError,
  setLoading,
  selectAuth,
} from "../store/slices/authSlice";

export const useAuth = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  return {
    ...auth,
    clearError: () => dispatch(clearError()),
  };
};

export const useLogin = () => {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await loginMutation(credentials).unwrap();

      if (response.success) {
        dispatch(
          loginSuccess({
            user: response.user,
            token: response.token,
          })
        );

        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }

        return { success: true, user: response.user };
      }
    } catch (error) {
      const errorMessage = error.message || "Login failed";
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { login, isLoading };
};

export const useRegister = () => {
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (userData) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());

      const response = await registerMutation(userData).unwrap();

      if (response.success) {
        dispatch(
          loginSuccess({
            user: response.user,
            token: response.token,
          })
        );

        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }

        return { success: true, user: response.user };
      }
    } catch (error) {
      const errorMessage = error.message || "Registration failed";
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { register, isLoading };
};

export const useLogout = () => {
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      dispatch(logoutAction());
      navigate("/login");
    }
  };

  return { logout };
};

export const useTokenVerification = () => {
  const { token, isAuthenticated } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const {
    data: verificationData,
    error: verificationError,
    isLoading: isVerifying,
  } = useVerifyTokenQuery(undefined, {
    skip: !token || !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (verificationError) {
      dispatch(logoutAction());
    } else if (verificationData?.success && verificationData?.user) {
      dispatch(
        loginSuccess({
          user: verificationData.user,
          token: token,
        })
      );
    }
  }, [verificationData, verificationError, dispatch, token]);

  return {
    isVerifying,
    isValidToken: verificationData?.success || false,
  };
};

export const useCurrentUser = () => {
  const { isAuthenticated } = useSelector(selectAuth);

  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = useGetMeQuery(undefined, {
    skip: !isAuthenticated,
  });

  return {
    user: userData,
    error,
    isLoading,
    refetch,
  };
};

export const useProtectedRoute = (requiredRole = null) => {
  const { isAuthenticated, user } = useSelector(selectAuth);
  const navigate = useNavigate();
  const { isVerifying } = useTokenVerification();

  useEffect(() => {
    if (!isVerifying) {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        if (user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
        return;
      }
    }
  }, [isAuthenticated, user, navigate, requiredRole, isVerifying]);

  return {
    isAuthenticated,
    user,
    isLoading: isVerifying,
    hasRequiredRole: requiredRole ? user?.role === requiredRole : true,
  };
};
