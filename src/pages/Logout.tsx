import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authToken";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Perform logout
        LogoutUser();
        console.log('LogoutUser called');
        
        // Redirect after logout
        navigate('/login');
        console.log('Navigated to /login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    handleLogout();

    // Return a cleanup function if needed
    return () => {
      // Any cleanup logic if needed
    };
  }, [LogoutUser, navigate]);

  // Return null or a loading spinner while logging out
  return null;
};
