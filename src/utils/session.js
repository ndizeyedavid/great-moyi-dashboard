import { useEffect } from "react";
import pb from "./pocketbase";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

function IsLoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedin = AuthService.getAdmin();
    if (!loggedin) {
      navigate("/");
    }
  }, []);

  return null;
}

export default IsLoggedIn;
