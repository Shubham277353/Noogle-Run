import { prisma } from "../lib/prisma.js";

export default async function fetchFolders(req, res, next){
    const id = req.user.id;
    const folders = await prisma.folder.findMany({
        where: {userId: id}
    })
    console.log("Hii from middleware", folders);
    res.locals.folders = folders;
    next();
}