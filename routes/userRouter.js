import { Router } from "express";
import { getSignUpForm, postSignupForm } from "../controllers/userController.js";
import { prisma } from './lib/prisma.js';
import { validateSignUpForm } from "../middlewares/signUpValidaton.js";

const userRouter = Router();

userRouter.get("/sign-up", getSignUpForm);
userRouter.post("/sign-up",validateSignUpForm, postSignupForm);

export default userRouter;