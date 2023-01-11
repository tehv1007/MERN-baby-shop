import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/password-reset", { email });
      setMsg(data.message);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <section>
      {/* Container */}
      <div className="w-screen h-screen px-4 flex items-center justify-center">
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
          <h5 className="my-4 text-gray-800 text-xl font-medium">
            Reset your password
          </h5>

          <p className="text-gray-800 text-sm leading-5 my-4 pt-1 text-left">
            Forgot your password? Don't worry! Please provide us with the email
            you used to register your account. We'll send you a link to reset
            your password via that email.
          </p>

          {/* Form container */}
          <div className="text-gray-800">
            <form onSubmit={handleSubmit}>
              <div className="mb-5 leading-10 text-sm text-gray-800 text-left">
                <div className="w-full text-sm flex flex-col flex-grow gap-2">
                  <label className="font-semibold">Your email address</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    autoComplete="off"
                    className="w-full px-4 rounded bg-white hover:bg-indigo-100 border-gray-300 hover:border-blue-500 border table-cell leading-9"
                  />
                  {error && (
                    <div className="p-4 text-sm bg-red-600 text-white rounded text-center border my-2">
                      {error}
                    </div>
                  )}
                  {msg && (
                    <div className="p-4 text-sm bg-green-500 text-white rounded text-center border my-2">
                      {msg}
                    </div>
                  )}
                </div>
              </div>
              {/* Actions */}
              <div className="flex justify-between gap-5 text-sm leading-3 text-center">
                <button
                  type="submit"
                  className="py-3 px-5 items-start hover:bg-blue-400 hover:border-blue-400 bg-blue-500 border-blue-500 rounded border text-white ">
                  <span> Submit </span>
                </button>
                <Link
                  to="/signin"
                  type="submit"
                  className="py-3 px-5 items-start hover:text-blue-500 hover:border-blue-500 bg-white border-gray-500 rounded border text-gray-500">
                  <span> Cancel </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
