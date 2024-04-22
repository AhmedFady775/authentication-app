import * as React from "react";
import { useFormik } from "formik";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";
import { loginSchema } from "./schemas";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await fetch("https://ill-rose-gosling-kilt.cyclic.app/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setLoading(false);
        toast.success("logged in");
        localStorage.setItem("userInfo", values.email);
        navigate("/2fa");
      } else {
        setLoading(false);
        toast.error("Invalid credentials");
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full mx-4 lg:mx-none lg:w-[500px] p-10 bg-white rounded-lg shadow-lg"
    >
      <div className="flex flex-col gap-2 mb-10 items-center">
        <img src={Logo} className="w-64 h-64 object-contain" />
      </div>
      <FormInput
        placeHolder="Email"
        name="email"
        type="email"
        onChange={handleChange}
        value={values.email}
        error={errors.email}
        touched={touched.email}
      />
      <div className="flex flex-col">
        <FormInput
          placeHolder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
          touched={touched.password}
        />
      </div>
      {loading ? (
        <button
          disabled
          className="rounded cursor-not-allowed flex items-center justify-center bg-[#5F58FF] px-8 py-2 text-white transition h-10"
        >
          <ReactLoading type="bubbles" color="#ffffff" height={25} width={25} />
        </button>
      ) : (
        <button
          type="submit"
          className="rounded bg-[#5F58FF] px-8 py-2 text-white transition lg:hover:bg-[#5F58FF]/80 h-10"
        >
          Login
        </button>
      )}
    </form>
  );
}

LoginForm;
