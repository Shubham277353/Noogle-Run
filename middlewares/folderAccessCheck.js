import { prisma } from "../lib/prisma.js";

export default async function folderAccessCheck(req, res, next) {
    try {
        const id = req.user.id;
        const folderId = Number(req.params.id);

        const folder = await prisma.folder.findFirst({
            where: { id: folderId, userId: id},
        });

        if (!folder) {
            return res.status(404).send("Folder not found");
        }
        next();
    } catch (error) {
        next(error);
    }
}
