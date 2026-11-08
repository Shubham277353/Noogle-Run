import { prisma } from "../lib/prisma.js";

export default async function fileAccessCheck(req, res, next) {
  try {
    const fileId = Number(req.params.fileId);
    const folderId = Number(req.params.id);
    const userId = Number(req.user.id);
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
        folder: {
          is: {
            id: folderId,
            userId: userId,
          },
        },
      },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }
    next();
  } catch (error) {
    next(error);
  }
}
