import { Router } from "express";
import { downloadFile, getFolder, postFile, postFolder, showFile } from "../controllers/folderController.js";
import folderAccessCheck from "../middlewares/folderAccessCheck.js";
import fetchFolders from "../middlewares/fetchFolders.js";
import authCheck from "../middlewares/authCheck.js";
import upload1 from "../middlewares/memorySave.js";
import fileTypeCheck from "../middlewares/filetTypeCheck.js";
import fileAccessCheck from "../middlewares/fileAccessCheck.js";

const folderRouter = Router();

folderRouter.post("/new", authCheck, postFolder);
folderRouter.get("/:id", authCheck, folderAccessCheck, fetchFolders, getFolder);
folderRouter.post("/:id/upload", authCheck, folderAccessCheck,upload1.single("userFile"), fileTypeCheck, postFile);
folderRouter.get("/:id/:fileId",authCheck, fileAccessCheck, fetchFolders, showFile);
folderRouter.get("/:id/:fileId/download",authCheck, fileAccessCheck, fetchFolders, downloadFile);

export {folderRouter};