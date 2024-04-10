import express from 'express'
import { registerController, uploadImageController, userAuth, verificationEmail } from '../controllers/userControllers.js';
import { authenticateToken } from '../authentication/userAuth.js';

const userRoute = express.Router();


userRoute.post('/register', registerController)

userRoute.get('/userAuth/:token', authenticateToken, userAuth);

userRoute.post('/uploadImage', uploadImageController)

userRoute.post('/verificationEmail', verificationEmail)


export default userRoute;

