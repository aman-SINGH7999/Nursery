import { Users, UserOTP, UserAddress } from "../models/index.js";
import { generateOTP } from "../utils/otp.js";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "../utils/sendEmail.js";
import { generateToken } from "../config/jwt.js";

const registerUser = async (req, res) => {
  try {
    const { name, mobile, email, password } = req.body;

    if (!name || !mobile || !email || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    // check already exist
    const isMobileExist = await Users.findOne({ where: { mobile } });

    if (isMobileExist){
      return res.status(403).json({ success: false, message: "Mobile already registered" });
    }

    if (email) {
      const isEmailExist = await Users.findOne({ where: { email } });
      if (isEmailExist){
        return res.status(403).json({ success: false, message: "Email already registered" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({name, mobile, email, password: hashedPassword});

    res.status(201).json({ success: true, message: "Registration Successfully"});

  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// otp for password change or same type 
const getOtp = async (req, res)=>{
  try{
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // check exist
    const isExist = await Users.findOne({where:{email}});

    if(!isExist){
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // generate otp
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // 5 minute
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // remove old otp
    await UserOTP.destroy({ where:{ email }});

    await UserOTP.create({
      email,
      otp: hashedOtp,
      expires_at: expiresAt
    })

    // send email
    await sendOtpEmail(email, otp);

    res.status(201).json({ success: true, message: "OTP sent successfully" });

  }catch(error){
    console.log("error: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}



const verifyOtp = async (req, res)=>{
  try{
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email & OTP is required" });
    }

    // check exist
    const isExist = await Users.findOne({where:{email}});

    if(!isExist){
      return res.status(404).json({ success: false, message: "Email not registered." });
    }

    // check exist
    const otpData = await UserOTP.findOne({where:{email}});

    if(!otpData){
      return res.status(404).json({ success: false, message: "OTP not found." });
    }

    if( new Date() > otpData.expires_at){
      await UserOTP.destroy({ where:{ email }});
      return res.status(403).json({ success: false, message: "otp expired" });
    }

    const isMatch  = await bcrypt.compare(otp, otpData.otp);

    if(!isMatch ){
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }
    // delete otp
    await UserOTP.destroy({ where:{ email }});
    const resetToken = generateOTP();
    const expires = new Date(Date.now() + 10 * 60 * 1000); 

    await Users.update(
      {
        password_reset_token: resetToken,
        password_reset_expires: expires
      },{
        where: {email}
      }
    )

    return res.status(200).json({ success: true, message: "otp verification successfully.", token: resetToken });

  }catch(error){
    console.log("error: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}



const loginUser = async (req, res)=>{
  try{
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email & Password is required" });
    }

    // check exist
    const user = await Users.findOne({where:{email}});

    if(!user){
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const isMatch  = await bcrypt.compare(password, user.password);

    if(!isMatch ){
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    const token = generateToken({id: user.id, email: user.email});

    res.cookie("token", token, {
      httpOnly: true,                                    // JS access nahi karega
      secure: process.env.NODE_ENV === "production",     // production me true otherwise false
      sameSite: "lax",                                   // cross-site control
      maxAge: 7 * 24 * 60 * 60 * 1000,                   // 7 days
    })

    //  password remove before sending response
    const userData = user.toJSON();
    delete userData.password;

    return res.status(200).json({ success: true, message: "Login successfully.", data: userData });

  }catch(error){
    console.log("error: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}



const getOtpForVerifyEmail = async (req, res)=>{
  try{
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // generate otp
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // 5 minute
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // remove old otp
    await UserOTP.destroy({ where:{ email }});

    await UserOTP.create({
      email,
      otp: hashedOtp,
      expires_at: expiresAt
    })

    // send email
    await sendOtpEmail(email, otp);

    res.status(201).json({ success: true, message: "OTP sent successfully" });

  }catch(error){
    console.log("error: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}



const verifyOtpForVerifyEmail = async (req, res)=>{
  try{
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email & OTP is required" });
    }

    // check exist
    const otpData = await UserOTP.findOne({where:{email}});

    if(!otpData){
      return res.status(404).json({ success: false, message: "OTP not found." });
    }

    if( new Date() > otpData.expires_at){
      await UserOTP.destroy({ where:{ email }});
      return res.status(403).json({ success: false, message: "otp expired" });
    }

    const isMatch  = await bcrypt.compare(otp, otpData.otp);

    if(!isMatch ){
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }
    // delete otp
    await UserOTP.destroy({ where:{ email }});

    return res.status(200).json({ success: true, message: "otp verification successfully." });

  }catch(error){
    console.log("error: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}


const changePassword = async (req,res)=>{
  const { email, password, token} = req.body;
  try{
    if(!email || !password){
      return res.status(400).json({ success: false, message: "Email & Password is required" });
    }
    const user = await Users.findOne({where:{email}});
    if(!user){
      return res.status(404).json({ success: false, message: "User not found." });
    }
    if(user.password_reset_expires < new Date() || token !== user.password_reset_token){
      return res.status(401).json({ success: false, message: "Unauthorized or token expired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword
    user.password_reset_token = null;
    user.password_reset_expires = null;

    await user.save();
    return res.status(200).json({ success: true, message: "Password update successfully." });

  }catch(error){
    console.log("error: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}



const isLoginCheck = async (req, res)=>{
  return res.status(200).json({success: true, data: req.user});
}

export { 
  registerUser,
  getOtp,
  verifyOtp,
  loginUser,
  getOtpForVerifyEmail,
  verifyOtpForVerifyEmail,
  changePassword,
  isLoginCheck
};
