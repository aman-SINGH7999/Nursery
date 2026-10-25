import {
  GET_OTP_EMAIL_API,
  REGISTER_API,
  VERIFY_OTP_EMAIL_API,
} from "@/app/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useEffect, useState } from "react";
import OtpBox from "./OtpBox";
import { useAlert } from "@/context/alert-context";
import { formatTime } from "@/lib/utils";
import { useCatchError } from "@/hooks/useCatchError";

export default function RegisterUI() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { showAlert } = useAlert();
  const handleError = useCatchError();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleRegister = async () => {
    if (loading) return;
    // if (timeLeft > 0) {
    //   showAlert({
    //     type: "error",
    //     title: "OTP already sent. Please wait.",
    //   });
    //   return;
    // }

    if (!data.email || !data.name || !data.mobile || !data.password) {
      showAlert({
        type:"error",
        title:"All fields are required."
      })
      return;
    }
    setLoading(true);
    try {
      await axios.post(GET_OTP_EMAIL_API, { email: data.email });
      setIsOtpSend(true);
      setTimeLeft(300);

    } catch (error: unknown) {
      console.log(error)
      handleError(error)
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!data.email || !data.name || !data.mobile || !data.password) {
      showAlert({
        type:"error",
        title:"All fields are required."
      })
      setIsOtpSend(true);
      return;
    }
    if (!otp) {
      showAlert({
        type:"error",
        title:"Otp required."
      })
      return;
    }
    setLoading(true);
    try {
      await axios.post(VERIFY_OTP_EMAIL_API, {
        email: data.email,
        otp,
      });
      await axios.post(REGISTER_API, data);

      showAlert({
        type:"success",
        title:"Registered successfully."
      })
      setTimeLeft(0);
      setOtp("");
      setData({
        name: "",
        email: "",
        password: "",
        mobile: "",
      })

    } catch (error: unknown) {
      console.log(error);
      handleError(error);
    } finally {
      setLoading(false);
      setIsOtpSend(false);
    }
  };


    useEffect(() => {
      if (!isOtpSend || timeLeft <= 0) return;
  
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }, [isOtpSend, timeLeft]);



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
          onResend={handleRegister}
          onBack={() => setIsOtpSend(false)}
        />
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={data.name}
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
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
            <Label htmlFor="email">Mobile</Label>
            <Input
              id="mobile"
              type="text"
              placeholder="9600000000"
              value={data.mobile}
              required
              onChange={(e) => setData({ ...data, mobile: e.target.value })}
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
            onClick={handleRegister}
          >
            {loading ? <Spinner /> : "Register"}
          </Button>
        </div>
      )}
    </>
  );
}
