import LoginForm from "../components/form/LoginForm";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginWithCredentials() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  React.useEffect(() => {
    if (userInfo) {
      navigate("/2fa");
    }
  }, [navigate, userInfo]);
  return (
    <div className="flex h-screen items-center lg:justify-center bg-gradient-to-b from-[#2D9E47] to-[#2D9E47]/60 ">
      <LoginForm />
    </div>
  );
}
