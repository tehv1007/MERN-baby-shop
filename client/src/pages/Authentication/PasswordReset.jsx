import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();

  const url = `${import.meta.env.BASE_URL}/password-reset/${param.id}/${
    param.token
  }`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { password });
      setMsg(data.message);
      setError("");
      window.location = "/signin";
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
    <>
      {validUrl ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <form
            className="p-2 bg-white flex flex-col items-center w-[400px] rounded-xl shadow-[0px_3px_3px_-2px_rgba(0,0,0,0.2), 0px_3px_4px_0px_rgba(0,0,0,0.14), 0px_1px_8px_0px_rgba(0,0,0,0.12)]"
            onSubmit={handleSubmit}>
            <h1>Add New Password</h1>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="p-4 bg-gray-200 text-sm rounded-xl my-1 w-[370px]"
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
            <button
              type="submit"
              className="bg-teal-500 text-white w-48 font-bold text-sm cursor-pointer py-3 my-3 mx-auto rounded-2xl">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
};

export default PasswordReset;
