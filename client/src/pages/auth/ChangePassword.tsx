import { CHANGE_PASSWORD } from "@/app/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAlert } from "@/context/alert-context";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useState } from "react";
import { useCatchError } from "@/hooks/useCatchError";

interface InputProp {
  email: string;
  setIsVerify: (value: boolean)=> void ;
  token: string;
}

export default function ChangePassword({ email, setIsVerify, token }: InputProp) {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showAlert } = useAlert();
  const handleError = useCatchError();

  const handleChangePassword = async () => {

    if(!password || !confirmPassword){
      showAlert({
        type:"error",
        title:"All fields are required."
      })
      return;
    }
    if(password !== confirmPassword){
      showAlert({
        type:"error",
        title:"Password not matched."
      })
      return;
    }

    setLoading(true)
    try{
      const res = await axios.post(CHANGE_PASSWORD, {email, password, token});
      if(res){
        setIsVerify(false);
        showAlert({
          type: "success",
          title: "Password change successfully", 
        });
      }
    }catch(error){
      console.log(error);
      handleError(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="********"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="********"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button
        className="w-full bg-green-500 hover:bg-green-600 text-white"
        onClick={handleChangePassword}
      >
        {loading ? <Spinner /> : "Change Password"}
      </Button>
    </div>
  );
}
