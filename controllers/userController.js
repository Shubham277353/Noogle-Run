import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

function getSignUpForm(req, res) {
  const isAuthenticated = req.isAuthenticated();
  res.render("signup", {data: {},  authenticatedUser: isAuthenticated});
}

function getLoginForm(req, res) {
  const isAuthenticated = req.isAuthenticated();
  res.render("login", {authenticatedUser: isAuthenticated});
}

async function postSignupForm(req, res) {
  console.log("hii");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signup", { errors: errors.mapped(), data: req.body });
  }

  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        hashedPassword: hashedPassword,
      },
    });
    console.log(user);
    res.redirect("/users/login");
  } catch (e) {
    console.error(e);
    res.status(500).json({
      errors: [{ msg: e.message || "Internal Server Error" }],
    });
  }
}

export { getSignUpForm, postSignupForm, getLoginForm };
