import { Router } from "express";
import { postFolder } from "../controllers/folderRouter.js";
const folderRouter = Router();

folderRouter.post("/new", postFolder);

export {folderRouter};