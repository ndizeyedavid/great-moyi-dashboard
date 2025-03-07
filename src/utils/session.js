import { useEffect } from "react";
import pb from "./pocketbase";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

function IsLoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      const loggedin = await AuthService.getAdmin();
      if (!loggedin) {
        navigate("/");
      }
    }

    checkSession();
  }, []);

  return null;
}

export default IsLoggedIn;
