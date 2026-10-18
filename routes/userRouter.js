import { Router } from "express";
import { getLoginForm, getSignUpForm, postSignupForm } from "../controllers/userController.js";
import { validateSignUpForm } from "../middlewares/signUpValidaton.js";

const userRouter = Router();

userRouter.get("/sign-up", getSignUpForm);
userRouter.post("/sign-up",validateSignUpForm, postSignupForm);

userRouter.get("/login", getLoginForm);
userRouter.post("/login")

export default userRouter;