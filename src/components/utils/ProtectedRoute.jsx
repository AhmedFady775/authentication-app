import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

export default function ProtectedRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [userInfo, navigate]);

  return userInfo ? (
    children
  ) : (
    <div className="h-screen w-full flex flex-col gap-5 justify-center items-center ">
      <p className="text-5xl font-bold"> Please log in first</p>
      <div className="text-gray-500 flex flex-col items-center gap-5">
        You now are being redirected to the sign in page
        <ReactLoading
          type="spinningBubbles"
          color="#000000"
          height={25}
          width={25}
        />
      </div>
    </div>
  );
}
