import express from 'express'
import { postSignIn, postSignUp } from '../controllers/auth.controller';
const router = express.Router();

router.post('/signin', postSignIn);
router.post('/signup', postSignUp);

export default router;