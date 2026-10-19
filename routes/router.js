import { Router } from "express";
import { getMainPage } from "../controllers/mainController.js";
import authCheck from "../middlewares/authCheck.js";

const router = Router();

router.get("/", authCheck, getMainPage);

export default router;