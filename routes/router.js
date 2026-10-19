import { Router } from "express";
import { getMainPage } from "../controllers/mainController.js";

const router = Router();

router.get("/", getMainPage);

export default router;