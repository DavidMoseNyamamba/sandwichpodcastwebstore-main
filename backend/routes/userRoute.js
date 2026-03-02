import express from 'express';
import { loginUser, registerUser, adminLogin, verifyEmail, resendVerification, getUserProfile } from '../controllers/userController.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/adminlogin', adminLogin);
userRouter.post('/verify-email', verifyEmail);
userRouter.post('/resend-verification', resendVerification);
userRouter.post('/profile', authUser, getUserProfile);

export default userRouter;