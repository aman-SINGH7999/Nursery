import { GET_OTP_API, LOGIN_API, VERIFY_OTP_API } from "@/app/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";
import OtpBox from "./OtpBox";
import { useAlert } from "@/context/alert-context";
import { useNavigate } from "react-router-dom";
import { useCatchError } from "@/hooks/useCatchError";
import { useAppDispatch } from "@/redux/store/hooks";
import { loginSuccess } from "@/redux/reducers/auth.reducers";

export default function LoginUI() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVerify, setIsVerify] = useState(false);
  const [token, setToken] = useState("");
  const { showAlert } = useAlert();
  const handleError = useCatchError();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      showAlert({
        type: "error",
        title: "Email & Password required",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(LOGIN_API, data, {withCredentials: true} );
      if(res.data.success){
        dispatch(loginSuccess({user: res.data.data, isLogin: true}));
      }
      showAlert({
        type: "success",
        title: "Login Successfully.", 
      });
      navigate('/');
      
      
    } catch (error: unknown) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async () => {
      if (loading) return;
      if (timeLeft > 0) {
        showAlert({
          type: "error",
          title: "OTP already sent. Please wait.",
        });
        return;

      }
    if (!data.email) {
      showAlert({
        type: "error",
        title: "Email required", 
      });
      return;
    }
    setLoading(true);
    try {
      await axios.post(GET_OTP_API, { email: data.email });
      setIsOtpSend(true);
      setTimeLeft(300);
    } catch (error: unknown) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!data.email) {
      showAlert({
        type: "error",
        title: "Email required", 
      });
      return;
    }
    if (!otp) {
      showAlert({
        type: "error",
        title: "OTP required", 
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(VERIFY_OTP_API, {
        email: data.email,
        otp,
      });
      setToken(res?.data?.token);
      setIsVerify(true);
      setIsOtpSend(false);
      setTimeLeft(0);
      setOtp("");
      
    } catch (error) {
      console.log(error);
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isOtpSend || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOtpSend, timeLeft]);

  if (isVerify) {
    return (
      <ChangePassword
        email={data.email}
        setIsVerify={setIsVerify}
        token={token}
      />
    );
  }

  return (
    <>
      {isOtpSend ? (
        <OtpBox
          otp={otp}
          setOtp={setOtp}
          timeLeft={timeLeft}
          formatTime={formatTime}
          loading={loading}
          onVerify={handleVerifyOtp}
          onResend={handleForgetPassword}
          onBack={() => setIsOtpSend(false)}
        />
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@gmail.com"
              value={data.email}
              required
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={data.password}
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <Button
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={handleLogin}
          >
            {loading ? <Spinner /> : "Login"}
          </Button>
          {!isVerify && (
            <div
              className="text-end text-green-500 hover:text-green-600 cursor-pointer"
              onClick={() => handleForgetPassword()}
            >
              forgot password
            </div>
          )}
        </div>
      )}
    </>
  );
}
