import express from 'express'
import { postRefreshToken, postSignIn, postSignUp } from '../controllers/auth.controller';
const router = express.Router();

router.post('/signin', postSignIn);
router.post('/signup', postSignUp);
router.post('/refresh', postRefreshToken);

export default router;