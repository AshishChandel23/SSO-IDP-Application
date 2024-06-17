import express from "express";
import clientApplicationRouter from '../client_app/index';
import staffRouter from '../staff/index';
import userRouter from '../user/index';
import InnerAdminRouter from '../admin/index';

const router = express();

router.use(InnerAdminRouter);
router.use('/user', userRouter);
router.use('/staff', staffRouter);
router.use('/application', clientApplicationRouter);

export default router;