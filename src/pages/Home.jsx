import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col gap-10 items-center">
        <img src={Logo} className="w-48 h-48" />
        <div className="flex flex-col gap-2 lg:gap-4 items-center">
          <p className="text-[#2D9E47] font-bold lg:text-5xl text-3xl">
            Welcome to Pied Piper
          </p>
          <p className="lg:text-xl">Enjoy our compression services.</p>
          <p className="absolute bottom-20 text-[#2D9E47] shadow p-4 rounded-md underline">
            You are now logged in
          </p>
        </div>
        <button
          onClick={() => {
            localStorage.clear("userInfo");
            navigate("/");
          }}
          className="rounded border-[#2D9E47] bg-[#2D9E47] px-8 py-2 text-sm text-white transition hover:bg-[#2D9E47]/80"
        >
          logout
        </button>
      </div>
    </div>
  );
}
