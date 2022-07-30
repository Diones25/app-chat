import { Router } from 'express';
import userController from '../controllers/userController';
export const router = Router();

router.post('/register', userController.register);