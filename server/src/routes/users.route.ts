import express, { Response } from 'express';
import { IRequestLogin } from '../interfaces/request-auth.interface';
import { authMiddleWare } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/profile', authMiddleWare, (req: IRequestLogin, res: Response) => {
  res.json(req.user)
    .status(200)
    .end();
});


export default router;