import express from 'express';
import { deleteUserById, getAllUser, getUserById } from './controller';

const router = express();

router.post('/getUserById', getUserById);
router.post('/deleteUserById', deleteUserById);
router.post('/getAllUser', getAllUser);

export default router;