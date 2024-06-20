import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../User/user.validation';
import { authControllers } from './auth.controller';
import { AuthValidationSchema } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserSchema),
  authControllers.signupUser,
);
router.post(
  '/login',
  validateRequest(AuthValidationSchema.loginSchema),
  authControllers.loginUser,
);

export const AuthRoutes = router;
