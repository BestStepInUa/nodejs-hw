import { Router } from 'express';
import { celebrate } from 'celebrate';

import { registerUserSchema } from '../validations/authValidation.js';

import { registerUser } from '../controllers/authController.js';

const authRouter = Router();

export default authRouter;

authRouter.post(
  '/register',
  celebrate(registerUserSchema, { abortEarly: false }),
  registerUser,
);
