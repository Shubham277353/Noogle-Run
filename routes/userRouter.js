import { Router } from "express";
import {
  getLoginForm,
  getSignUpForm,
  postSignupForm,
} from "../controllers/userController.js";
import { validateForm } from "../middlewares/signUpValidaton.js";
import passport from "passport";

const userRouter = Router();

userRouter.get("/sign-up", getSignUpForm);
userRouter.post("/sign-up", validateForm, postSignupForm);

userRouter.get("/login", getLoginForm);
userRouter.post(
  "/login",
  validateForm,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/error",
    failureMessage: true,
  }),
);

export default userRouter;
