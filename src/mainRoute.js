import express from "express";
import authRouter from './auth/index';
import adminRouter from './routes/adminRoute';

const router = express();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);

export default router;