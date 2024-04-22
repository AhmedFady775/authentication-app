import * as React from "react";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <div className="flex h-screen items-center lg:justify-center bg-gradient-to-b from-[#5F58FF] to-[#5F58FF]/60 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full mx-4 lg:mx-none lg:w-[500px] p-10 bg-white rounded-lg shadow-lg"
      >
        <p className="text-center">
          Enter the pin code from your Authenticator App
        </p>
        <div className="flex gap-4">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              name="code"
              type="text"
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
              className={`w-full rounded-md border px-4 py-2 focus:border-[#5F58FF] focus:ring-[#5F58FF] focus:outline-[#5F58FF] flex items-center justify-center text-center`}
            />
          ))}
        </div>
        {loading ? (
          <button
            disabled
            className="rounded cursor-not-allowed flex items-center justify-center bg-[#5F58FF] px-8 py-2 text-white transition h-10"
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
            className="rounded bg-[#5F58FF] px-8 py-2 text-white transition lg:hover:bg-[#5F58FF]/80 h-10"
          >
            Enter Pin
          </button>
        )}
      </form>
    </div>
  );
}
