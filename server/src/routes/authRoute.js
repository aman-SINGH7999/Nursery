import express from 'express'
import { 
  getOtp, 
  loginUser, 
  changePassword,
  registerUser, 
  verifyOtp, 
  getOtpForVerifyEmail, 
  verifyOtpForVerifyEmail, 
  isLoginCheck
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const authRoute = express.Router();

authRoute.post('/register', registerUser);
authRoute.post('/get-otp', getOtp);
authRoute.post('/verify-otp', verifyOtp);
authRoute.post('/login', loginUser);
authRoute.post('/change-password', changePassword)
authRoute.post('/get-otp-for-verify-email', getOtpForVerifyEmail);
authRoute.post('/verify-otp-for-verify-email', verifyOtpForVerifyEmail);
authRoute.get('/is-login', protect, isLoginCheck);

export default authRoute;