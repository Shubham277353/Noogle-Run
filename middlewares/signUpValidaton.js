import { body } from "express-validator";
import { prisma } from "../lib/prisma.js";

const validateSignUpForm = [
    body('username')
    .trim()
    .notEmpty().withMessage("Username can't be empty")
    .isLength({min: 5}).withMessage("Username must be atleast 5 character long"),

    body('email')
    .trim()
    .notEmpty().withMessage("email can't be empty")
    .isEmail().withMessage("enter a valid email")
    .custom(async(value) => {
        const user = prisma.user.findUnique({
                where: { email: value},
            });
        if(user){
            throw new Error("Email already in use.");
        }
    }),

    body('password')
    .trim()
    .notEmpty().withMessage("password can't be empty")
    .isLength({min:6, max: 16}).withMessage("Password must be atleast 6 and max 16 characters long"),

    body('confirmPassword')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
];

export {validateSignUpForm};