import { Link } from "react-router-dom";
import success from "../../assets/img/success.png";

const EmailVerify = () => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto flex items-center justify-center flex-col flex-grow">
        <img
          src={success}
          alt="success_img"
          className="text-green-500 w-20 h-auto mb-5"
        />
        <h1>Email verified successfully !</h1>
        <Link to="/signin">
          <button className="py-3 rounded-2xl bg-teal-500 w-48 font-bold text-sm cursor-pointer mt-5">
            Login
          </button>
        </Link>
      </div>
    </>
  );
};

export default EmailVerify;
