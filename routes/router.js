import { Router } from "express";
import { getMainPage } from "../controllers/mainController.js";
import authCheck from "../middlewares/authCheck.js";
import fetchFolders from "../middlewares/fetchFolders.js";

const router = Router();

router.get("/", authCheck, fetchFolders, getMainPage);

export default router;