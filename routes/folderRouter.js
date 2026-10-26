import { Router } from "express";
import { getFolder, postFolder } from "../controllers/folderController.js";
import folderAccessCheck from "../middlewares/folderAccessCheck.js";
import fetchFolders from "../middlewares/fetchFolders.js";
const folderRouter = Router();

folderRouter.post("/new", postFolder);
folderRouter.get("/:id", folderAccessCheck, fetchFolders, getFolder);

export {folderRouter};