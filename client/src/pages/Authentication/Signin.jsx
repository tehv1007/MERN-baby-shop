import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormRowError from "../../components/common/RowError";
import { signinSchema } from "../../validation/authSchema";

const Signin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const mutation = useMutation({
    mutationFn: async (loginUser) => {
      try {
        // const url = `${import.meta.env.VITE_APP_BASE_URL}/auth/signin`;
        const { data: res } = await axios.post("/auth/signin", loginUser);
        localStorage.setItem("token", JSON.stringify(res.user_token));
        localStorage.setItem("user", JSON.stringify(res.user));
        window.location = "/";
        // window.location.reload(false);
        // setTimeout(() => {
        //   navigate("/");
        //   setIsLoading(false);
        // }, 1000);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  const google = () => {
    window.open(`${import.meta.env.VITE_APP_BASE_URL}/auth/google`, "_self");
  };

  const facebook = () => {
    window.open(`${import.meta.env.VITE_APP_BASE_URL}/auth/facebook`, "_self");
  };

  return (
    <section>
      {/* Container */}
      <div className="w-screen h-screen px-4 flex items-center justify-center">
        {/* Layout */}
        <div className="w-[450px] bg-white overflow-hidden text-gray-800 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.1)] p-5 border-gray-200 border rounded">
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
            Login
          </h5>

          {/* Form container */}
          <div className="text-gray-800">
            {/* Form layout */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5 leading-10 text-sm">
                {/* Email-Username */}
                <div className="w-full text-sm flex flex-grow">
                  <div className="flex justify-center items-center border border-y-gray-300 text-center rounded-tr-none rounded-br-none px-5 bg-gray-100 text-gray-600 rounded w-px">
                    <i aria-hidden="true" className="fa fa-user" />
                  </div>
                  <input
                    {...register("emailUsername")}
                    type="text"
                    name="emailUsername"
                    autoComplete="off"
                    placeholder="Username or email address"
                    className="w-full px-4 rounded rounded-tl-none rounded-bl-none bg-white hover:bg-indigo-100 border-gray-300 hover:border-blue-500 border table-cell leading-9"
                  />
                </div>
                <FormRowError error={errors.emailUsername} />
              </div>

              {/* Password */}
              <div className="mb-5 leading-10 text-sm">
                <div className="w-full text-sm flex flex-grow">
                  <div className="flex justify-center items-center border border-y-gray-300 text-center rounded-tr-none rounded-br-none px-5 bg-gray-100 text-gray-600 rounded w-px">
                    <i aria-hidden="true" className="fa fa-lock" />
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Password"
                    className="w-full px-4 rounded rounded-tl-none rounded-bl-none bg-white hover:bg-indigo-100 border-gray-300 hover:border-blue-500 border table-cell leading-9"
                  />
                </div>
                <FormRowError error={errors.password} />
              </div>

              {error && (
                <div className="p-4 text-sm bg-red-600 text-white rounded text-center border my-2">
                  {error}
                </div>
              )}
              {/* Actions */}
              <button
                type="submit"
                className="py-3 px-5 w-full items-start hover:bg-blue-400 hover:border-blue-400 bg-blue-500 border-blue-500 rounded border text-white text-sm leading-3 text-center">
                <span> Sign in </span>
              </button>
            </form>

            <div className="text-gray-800 flex justify-between my-2">
              <Link
                to="/forgot-password"
                className="text-blue-700  leading-5 hover:text-blue-400 hover:underline">
                <small>Forgot your password?</small>
              </Link>
              <Link
                to="/signup"
                className="text-blue-700  leading-5 hover:text-blue-400 hover:underline">
                <small>Create account</small>
              </Link>
            </div>

            {/* Signin with Oauth2 */}
            <div className="items-center text-gray-800 flex justify-between mb-4">
              <hr className="border-gray-400 bg-gray-400 border-y-1 w-full" />
              <span className="w-full text-center">Sign in with</span>
              <hr className="border-gray-400 bg-gray-400 border-y-1 w-full" />
            </div>

            {/* Sub-Container */}
            <div className="social-login">
              <ul className="items-center flex flex-col md:flex-row gap-2">
                {/* Facebook login */}
                <button
                  onClick={facebook}
                  type="button"
                  className="w-full py-2.5 px-5 items-start bg-white hover:bg-indigo-100 border-indigo-200 rounded border text-gray-700 hover:text-blue-500 text-sm leading-3">
                  <i className="fab fa-facebook-f mr-2 text-indigo-800 inline-block text-sm leading-3 text-center" />
                  <span className="">Facebook</span>
                </button>

                {/* Google login */}
                <button
                  onClick={google}
                  type="button"
                  className="w-full py-2.5 px-5 items-start bg-white hover:bg-indigo-100 border-gray-300 rounded border text-gray-700 hover:text-blue-500 text-sm leading-3">
                  <i className="fab fa-google mr-2 text-red-600 inline-block text-sm leading-3 text-center" />
                  <span className="">Google</span>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
