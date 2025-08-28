export const handleApiError = (error) => {
  console.error("API Error:", error);

  if (!error.response) {
    return "Network error. Please check your connection and try again.";
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  switch (error.response?.status) {
    case 400:
      return "Bad request. Please check your input and try again.";
    case 401:
      return "Invalid credentials. Please check your email and password.";
    case 403:
      return "Access denied. You don't have permission to perform this action.";
    case 404:
      return "Resource not found.";
    case 422:
      return "Validation error. Please check your input.";
    case 500:
      return "Server error. Please try again later.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

export const formatValidationErrors = (errors) => {
  if (!errors || !Array.isArray(errors)) {
    return {};
  }

  const formattedErrors = {};
  errors.forEach((error) => {
    if (error.param && error.msg) {
      formattedErrors[error.param] = error.msg;
    }
  });

  return formattedErrors;
};

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Date.now() / 1000;

    return payload.exp > currentTime;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

export const getUserRoleFromToken = (token) => {
  if (!token || !isTokenValid(token)) return null;

  try {
    const parts = token.split(".");
    const payload = JSON.parse(atob(parts[1]));
    return payload.role || null;
  } catch (error) {
    console.error("Error extracting role from token:", error);
    return null;
  }
};

export const TokenStorage = {
  set: (token) => {
    try {
      localStorage.setItem("auth_token", token);
    } catch (error) {
      console.error("Error storing token:", error);
    }
  },
  get: () => {
    try {
      return localStorage.getItem("auth_token");
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  },
  remove: () => {
    try {
      localStorage.removeItem("auth_token");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};

export const buildApiUrl = (endpoint) => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  return `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
};

export const ValidationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
  },
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters long",
    },
  },
  phone: {
    pattern: {
      value: /^[+]?[1-9][\d]{0,15}$/,
      message: "Please enter a valid phone number",
    },
  },
};

export const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let strength = "weak";
  if (score >= 4) strength = "strong";
  else if (score >= 3) strength = "medium";

  return {
    score,
    strength,
    checks,
    suggestions: [
      !checks.length && "Use at least 8 characters",
      !checks.uppercase && "Add uppercase letters",
      !checks.lowercase && "Add lowercase letters",
      !checks.number && "Add numbers",
      !checks.special && "Add special characters",
    ].filter(Boolean),
  };
};
