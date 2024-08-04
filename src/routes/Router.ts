import { Router } from 'express';
import {userRouter, productRouter} from './';
import { authRouter } from './authRouter';
import { verifyToken } from '../Middleware/authMiddleware';

const router = Router();

router.use('/users',verifyToken, userRouter);
router.use('/products',verifyToken, productRouter);
router.use('/auth', authRouter);

export default router;
