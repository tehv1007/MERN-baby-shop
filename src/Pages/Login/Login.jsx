import { useContext, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoginImg from "../../assets/login.jpeg";
import { toast } from "react-toastify";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success("Successfully Login");
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        toast.error(`${error.response.data.message}`);
      });
  };

  return (
    <>
      <div className="flex items-center min-h-screen p-6 bg-gray-50">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full"
                src={LoginImg}
                alt="Logo"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-6 text-2xl font-semibold text-gray-700">
                  Login
                </h1>
                <form onSubmit={handleLogin}>
                  <label className="block text-sm text-gray-700 col-span-4 sm:col-span-2 font-medium">
                    Email
                  </label>
                  <input
                    className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring focus:ring-green-300 border h-12 bg-gray-100 border-transparent focus:bg-white"
                    type="email"
                    name="email"
                    placeholder="john@doe.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="mt-6" />
                  <label className="block text-sm text-gray-700 col-span-4 sm:col-span-2 font-medium">
                    Password
                  </label>
                  <input
                    className="px-3 py-1 leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                    type="password"
                    name="password"
                    placeholder="***************"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <p className="text-xs">
                    email: hoangte@gmail.com / pw: 0240576245
                  </p>

                  <button
                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 mt-4 h-12 w-full"
                    type="submit"
                  >
                    Log in
                  </button>
                  {error && (
                    <span className="flex justify-center mt-2 text-red-500">
                      Wrong email or password!
                    </span>
                  )}
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
