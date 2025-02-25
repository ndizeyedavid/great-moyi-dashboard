import { useEffect } from "react";
import pb from "./pocketbase";
import { useNavigate } from "react-router-dom";

function IsLoggedIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedin = pb.authStore.isValid;
    if (!loggedin) {
      navigate("/");
    }
  }, []);

  return null;
}

export default IsLoggedIn;
