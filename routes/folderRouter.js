import { Router } from "express";
import { getFolder, postFile, postFolder } from "../controllers/folderController.js";
import folderAccessCheck from "../middlewares/folderAccessCheck.js";
import fetchFolders from "../middlewares/fetchFolders.js";
import authCheck from "../middlewares/authCheck.js";
import upload from "../middlewares/multer.js";
const folderRouter = Router();

folderRouter.post("/new", authCheck, postFolder);
folderRouter.get("/:id", authCheck, folderAccessCheck, fetchFolders, getFolder);
folderRouter.post("/:id/upload", authCheck, folderAccessCheck, upload.single("userFile"), postFile);

export {folderRouter};