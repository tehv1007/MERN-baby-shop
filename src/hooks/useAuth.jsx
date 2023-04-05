import { toast } from "react-toastify";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const signIn = (setError) => {
  const navigate = useNavigate();

  const signIn = useMutation({
    mutationFn: async (loginUser) => {
      const { data: res } = await axios.post("/auth/signin", loginUser);

      localStorage.setItem("token", JSON.stringify(res.user_token));
      localStorage.setItem("user", JSON.stringify(res.user));

      window.location.reload(false);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
    onSuccess: () => {
      toast.success("Successfully Login");
    },
    onError: (err) => {
      toast.error(`${err.response.data.message}`);
      setError(err.response.data.message);
    },
  });

  return signIn;
};

export const signUp = (setError, setShow, setMsg) => {
  const signUp = useMutation({
    mutationFn: async (newUser) => {
      const { data: res } = await axios.post("/auth/signup", newUser);
      setMsg(res.message);
      setShow(true);
    },
    onSuccess: () => {
      toast.success("Successfully Create Account");
    },
    onError: (err) => {
      toast.error(`${err.response.data.message}`);
      setError(err.response.data.message);
      setShow(false);
    },
  });

  return signUp;
};
