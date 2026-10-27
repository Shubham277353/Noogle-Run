import path from "node:path";
import { prisma } from "../lib/prisma.js";
import { promises as fs } from 'fs';
import { fileTypeFromBuffer } from "file-type";


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
    res.redirect(`/folder/${folder.id}`);
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
  
  try{
    
    const uploadDir = path.join(process.cwd(), 'uploads');
    const uniqueFileName = `${Date.now()}-${req.file.originalname}`;
    const fullPath = path.join(uploadDir, uniqueFileName);
    
    await fs.writeFile(fullPath, req.file.buffer);
    
    const fileName = req.file.originalname;
    const size = req.file.size;
    const url = fullPath;
    const folderId = Number(req.params.id);

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
  } finally{
    if(req.file){
      req.file.buffer = null;
    }
  }
}

export { postFolder, getFolder, postFile };
