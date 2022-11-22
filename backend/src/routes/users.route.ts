import express from 'express';

const router = express.Router();

import { postSignIn } from '../controllers/users.controller'

router.post('/', postSignIn)

export default router;