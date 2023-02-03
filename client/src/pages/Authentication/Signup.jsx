import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signupSchema } from "../../validation/authSchema";
import InputCard from "../../components/auth/InputCard";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const google = () => {
    window.open(`${import.meta.env.VITE_APP_BASE_URL}/auth/google`, "_self");
  };

  const facebook = () => {
    window.open(`${import.meta.env.VITE_APP_BASE_URL}/auth/facebook`, "_self");
  };

  const [msg, setMsg] = useState("");
  const [show, setShow] = useState("false");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: async (newUser) => {
      try {
        //   const url = `${import.meta.env.VITE_APP_BASE_URL}/auth/signup`;
        const { data: res } = await axios.post("/auth/signup", newUser);
        setMsg(res.message);
        setShow(true);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
          setShow(false);
        }
      }
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <section>
      {/* Container */}
      <div className="w-screen h-screen px-4 flex justify-center items-center">
        {/* Layout */}
        <div className="w-[450px] bg-white text-gray-800 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.1)] p-5 border-gray-200 border rounded">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src="https://diadiemhanquoc.com/wp-content/uploads/2023/01/toys-shop-logo.png"
              alt="Shop"
              className="w-44"
            />
          </div>

          {/* Header title */}
          <h5 className="my-4 text-center text-gray-800 text-xl font-medium">
            Create Account
          </h5>

          {/* Form container */}
          <div className="text-gray-800">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputCard
                placeholder="Full name"
                name="name"
                register={register}
                errors={errors.name}
              />
              <InputCard
                placeholder="Email address"
                name="email"
                type="email"
                register={register}
                errors={errors.email}
              />
              <InputCard
                placeholder="Username"
                name="username"
                register={register}
                errors={errors.username}
              />
              <InputCard
                placeholder="Password"
                name="password"
                type="password"
                register={register}
                errors={errors.password}
              />
              <InputCard
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                register={register}
                errors={errors.confirmPassword}
              />
              {error && !show && (
                <div className="p-4 text-sm bg-red-600 text-white rounded text-center border my-2">
                  {error}
                </div>
              )}
              {msg && show && (
                <div className="p-4 text-sm  bg-green-500  text-white rounded text-center border my-2">
                  {msg}
                </div>
              )}

              {/* Actions */}
              <button
                type="submit"
                className="py-3 px-5 w-full items-start hover:bg-blue-400 hover:border-blue-400 bg-blue-500 border-blue-500 rounded border text-white text-sm leading-3 text-center">
                <span> Sign up </span>
              </button>
            </form>

            <div className="text-gray-800 flex my-4">
              <Link
                to="/signin"
                className="text-blue-700 leading-5 hover:text-blue-400 hover:underline">
                <small>Already have an account? Please login here</small>
              </Link>
            </div>

            {/* Signin with Oauth2 */}
            <div className="items-center text-gray-800 flex justify-between my-4">
              <hr className="border-gray-400 bg-gray-400 border-y-1 w-full" />
              <span className="w-full text-center">Sign in with</span>
              <hr className="border-gray-400 bg-gray-400 border-y-1 w-full" />
            </div>

            {/* Sub-Container */}
            <div className="social-login">
              <ul className="items-center flex flex-col md:flex-row gap-2 text-sm leading-3">
                {/* Facebook login */}
                <button
                  onClick={facebook}
                  type="button"
                  className="w-full py-2.5 px-5 items-start bg-white hover:bg-indigo-100 border-indigo-200 rounded border text-gray-700 hover:text-blue-500 ">
                  <i className="fab fa-facebook-f mr-2 text-indigo-800 text-center" />
                  <span>Facebook</span>
                </button>

                {/* Google login */}
                <button
                  onClick={google}
                  type="button"
                  className="w-full py-2.5 px-5 items-start bg-white hover:bg-indigo-100 border-gray-300 rounded border text-gray-700 hover:text-blue-500">
                  <i className="fab fa-google mr-2 text-red-600 text-center" />
                  <span>Google</span>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
