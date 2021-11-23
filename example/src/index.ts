import "./prep";
import { CloudflareStorage } from "../../src";
import express, { Request, Response } from "express";
import multer from "multer";

const app = express();
const uploader = multer({
    storage: new CloudflareStorage(process.env.CLOUDFLARE_ACCOUNT_ID!, process.env.CLOUDFLARE_TOKEN!)
});

app.post("/", uploader.single("image"), (req: Request, res: Response) => {
    console.log(req.file);
});

app.listen(process.env.PORT ?? 4444, () => console.log("Test server started!"));
