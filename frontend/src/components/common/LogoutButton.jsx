import { LogOut } from "lucide-react";
import { useLogout } from "../../hooks/useAuth";

const LogoutButton = ({ className = "", showText = true }) => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200 ${className}`}
      title="Logout"
    >
      <LogOut className="w-5 h-5" />
      {showText && <span>Logout</span>}
    </button>
  );
};

export default LogoutButton;
