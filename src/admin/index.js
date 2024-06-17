import express from 'express';
import { getDashBoardDetails } from './adminController';

const router = express();

router.get('/getDashboardDetails', getDashBoardDetails);

export default router;