import { prisma } from "../lib/prisma.js";

async function postFolder(req, res) {
    const name = req.body.folderName;
    const userId = req.user.id;
    try{
        const folder = await prisma.folder.create({
            data: {
                name: name,
                userId: userId
            }
        })
    console.log(folder);
    res.redirect("/");
    }catch(err){
        console.error(err);
        res.status(500).json({
            errors: [{ msg: e.message || "Internal Server Error" }],
        });
    }

}

export { postFolder };