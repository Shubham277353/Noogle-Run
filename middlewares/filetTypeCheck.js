import { fileTypeFromBuffer } from "file-type";
import path from "node:path";

export default async function fileTypeCheck(req, res, next) {
  console.log("hii its file check middleware");

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    const claimedExt = path.extname(req.file.originalname).toLocaleLowerCase();
    const typeInfo = await fileTypeFromBuffer(req.file.buffer);

    if (!typeInfo) {
      return res.status(400).json({
        error: "Could not determine file type or file is not binary.",
      });
    }

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
      "application/zip",
    ];

    if (!allowedMimeTypes.includes(typeInfo.mime)) {
      return res.status(400).json({
        error: `File type ${typeInfo.mime} is not allowed.`,
      });
    }

    const extensionMap = {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
      "application/zip": [".zip"],
    };

    const validExtension = extensionMap[typeInfo.mime] || [];

    if (!validExtension.includes(claimedExt)) {
      return res.status(400).json({
        error: `Extension mismatch! The file is actually a ${typeInfo.ext.toUpperCase()}, but it has a '${claimedExt}' extension.`,
      });
    }

    next();
  } catch (error) {
    console.error("Error reading file buffer:", error);
    return res.status(500).json({ error: "Internal validation failure." });
  }
}
