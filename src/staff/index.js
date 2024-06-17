import express from 'express';
import { addStaff, deleteStaffById, getAllStaff } from './controller';

const router = express();

router.post('/addStaff', addStaff);
router.post('/deleteStaffById', deleteStaffById);
router.post('/getAllStaff', getAllStaff);

export default router;