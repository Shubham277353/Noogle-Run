import path from "node:path";
import { prisma } from "../lib/prisma.js";

async function postFolder(req, res) {
  const name = req.body.folderName;
  const userId = req.user.id;
  try {
    const folder = await prisma.folder.create({
      data: {
        name: name,
        userId: userId,
      },
    });
    console.log(folder);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errors: [{ msg: e.message || "Internal Server Error" }],
    });
  }
}

async function getFolder(req, res) {
  const authCheck = req.isAuthenticated();
  const id = req.params.id;
  const folder = await prisma.folder.findFirst({
    where: { id: Number(id) }
  });

  const files = await prisma.file.findMany({
    where: {folderId: Number(id)},
  });

  const filesWithExtension = files.map((file) => ({
    ...file,
    extension: path.extname(file.fileName).toLocaleLowerCase()
  }));

  console.log("hii from the conrtoller", filesWithExtension);
  res.render("folder", { files: filesWithExtension, folder: folder, authenticatedUser: authCheck });
}

async function  postFile(req, res) {
  const fileName = req.file.originalname;
  const size = req.file.size;
  const url = req.file.path;
  const folderId = Number(req.params.id);

  try{
    const file = await prisma.file.create({
      data: {
        fileName: fileName,
        size: size,
        url: url,
        folderId: folderId,
      }
    })
    console.log(file);
    res.redirect(`/folder/${folderId}`);
  }catch(err){
    console.error(err);
    res.status(500).json({
      errors: [{ msg: "Internal Server Error" }],
    });
  }
}

export { postFolder, getFolder, postFile };
