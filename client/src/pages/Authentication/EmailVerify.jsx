import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../assets/success.svg";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState();
  const param = useParams();

  const url = `${import.meta.env.VITE_APP_BASE_URL}/auth/${param.id}/verify/${
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

  return (
    <>
      {validUrl ? (
        <div className="max-w-screen-xl mx-auto flex items-center justify-center flex-col">
          <img src={success} alt="success_img" className="text-green-500" />
          <h1>Email verified successfully</h1>
          <Link to="/signin">
            <button className="py-3 rounded-2xl bg-teal-500 w-48 font-bold text-sm cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
};

export default EmailVerify;
