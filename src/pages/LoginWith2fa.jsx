import * as React from "react";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo_2FA from "../assets/2FA.png";

export default function LoginWith2fa() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const [code, setCode] = React.useState([]);
  console.log(localStorage.getItem("userInfo"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(
      "https://ill-rose-gosling-kilt.cyclic.app/2fa/piedpiper",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userInfo"),
          code: code.join(""),
        }),
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      setLoading(false);
      toast.success("logged in");
      navigate("/home");
    } else {
      setLoading(false);
      toast.error("Invalid pin code");
    }
  };

  return (
    <div className="flex h-screen items-center lg:justify-center bg-gradient-to-b from-[#2D9E47] to-[#2D9E47]/60 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full mx-4 lg:mx-none lg:w-[500px] p-4 lg:p-10 bg-white rounded-lg shadow-lg"
      >
        <p className="text-center flex w-[275px] mx-auto">
          Enter the pin code from your SypherGate 2FA app
        </p>
        <div className="flex gap-1 lg:gap-4">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              name="code"
              type="number"
              accept="number"
              onChange={(e) => {
                const value = e.target.value;
                if (value.length === 1) {
                  setCode([...code, value]);
                  if (i < 5) {
                    document.getElementsByName("code")[i + 1].focus();
                  }
                }
                if (value.length === 0) {
                  setCode([...code.slice(0, i)]);
                  if (i > 0) {
                    document.getElementsByName("code")[i - 1].focus();
                  }
                }
              }}
              value={code[i]}
              className={`w-full rounded-md border px-4 py-2 focus:border-[#2D9E47] focus:ring-[#2D9E47] focus:outline-[#2D9E47] flex items-center justify-center text-center`}
            />
          ))}
        </div>
        {loading ? (
          <button
            disabled
            className="rounded cursor-not-allowed flex items-center justify-center bg-[#2D9E47] px-8 py-2 text-white transition h-10"
          >
            <ReactLoading
              type="bubbles"
              color="#ffffff"
              height={25}
              width={25}
            />
          </button>
        ) : (
          <button
            type="submit"
            className="rounded bg-[#2D9E47] px-8 py-2 text-white transition lg:hover:bg-[#2D9E47]/80 h-10"
          >
            Enter Pin
          </button>
        )}
        <p className="text-sm flex items-center justify-center gap-4">
          Powered by
          <img src={logo_2FA} className="w-6 h-6 object-contain " />
        </p>
      </form>
    </div>
  );
}
