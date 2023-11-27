import fetch from "node-fetch";
import FormData from "form-data";
import type { StorageEngine } from "multer";
import type { Request } from "express";
import type { CloudflareCDNUploadResponse } from "./typings";

type CallbackFunction = (error: Error | null, info?: Partial<Express.Multer.File>) => void;

class CloudflareStorage implements StorageEngine {
    private destURL: string;
    public constructor(private accountID: string, private accountToken: string) {
        if (!accountID || typeof accountID !== "string") throw new Error("You must specify a proper accountID belonging to your cloudflare account.");
        if (!accountToken || typeof accountToken !== "string") throw new Error("You must specify a proper account token.");
        this.destURL = `https://api.cloudflare.com/client/v4/accounts/${this.accountID}/images/v1`;
    }

    public _handleFile(_req: Request, file: Express.Multer.File, callback: CallbackFunction): void {
        const body = new FormData();
        body.append("file", file.stream, file.originalname);
        void this._uploadFile(body, callback);
    }

    public _removeFile(_req: Request, file: Express.Multer.File, callback: (error: Error | null) => void): void {
        void this._deleteFile(file.destination, callback);
    }

    private async _uploadFile(body: FormData, callback: CallbackFunction) {
        const request = await fetch(this.destURL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.accountToken}`,
                ...body.getHeaders()
            },
            body
        })

        const response: CloudflareCDNUploadResponse = await request.json();
        if (request.ok) {
            return callback(null, {
                path: response.result.variants[0],
                filename: response.result.filename,
                destination: response.result.id
            });
        }

        return callback(new Error("There was an error in uploading an asset to Cloudflare Images."));
    }

    private async _deleteFile(filedestination: string, callback: CallbackFunction) {
        const request = await fetch(`${this.destURL}/${filedestination}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.accountToken}`
            }
        });

        if (request.ok) return callback(null);
        return callback(new Error("There was an error in deleting the asset from Cloudflare Images."));
    }
}

export { CloudflareStorage };
export default CloudflareStorage;
