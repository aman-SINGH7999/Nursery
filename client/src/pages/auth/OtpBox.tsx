import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface OtpBoxProps {
  otp: string;
  setOtp: (val: string) => void;
  timeLeft: number;
  formatTime: (t: number) => string;
  loading: boolean;
  onVerify: () => void;
  onResend: () => void;
  onBack: () => void;
}

export default function OtpBox({
  otp,
  setOtp,
  timeLeft,
  formatTime,
  loading,
  onVerify,
  onResend,
  onBack,
}: OtpBoxProps) {
  return (
    <div className="space-y-4">
      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
        <InputOTPGroup className="gap-2">
          {[0,1,2,3,4,5].map(i => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <p className="text-sm">
        {timeLeft > 0 ? (
          <>
            OTP expires in{" "}
            <span className="text-red-500 font-medium">
              {formatTime(timeLeft)}
            </span>
          </>
        ) : (
          <span className="text-red-600">OTP expired</span>
        )}
      </p>

      <Button
        className="w-full bg-green-500"
        onClick={onVerify}
        disabled={otp.length !== 6 || loading}
      >
        {loading ? <Spinner /> : "Verify OTP"}
      </Button>

      <div className="flex justify-between">
        <span
          onClick={timeLeft <= 0 ? onResend : undefined}
          className={
            timeLeft > 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-green-500 cursor-pointer"
          }
        >
          Resend OTP
        </span>

        <span
          onClick={onBack}
          className="text-red-500 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft size={18} /> Back
        </span>
      </div>
    </div>
  );
}
