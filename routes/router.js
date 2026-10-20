import { Router } from "express";
import { getMainPage } from "../controllers/mainController.js";
import authCheck from "../middlewares/authCheck.js";

const router = Router();

router.get("/", authCheck, getMainPage);
router.get("/home", authCheck, getMainPage);
router

export default router;