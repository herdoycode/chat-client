import { useEffect } from "react";
import { logout } from "../../services/authService";

const Logout = () => {
  useEffect(() => {
    logout();
    window.location = "/login";
  }, []);

  return;
};

export default Logout;
