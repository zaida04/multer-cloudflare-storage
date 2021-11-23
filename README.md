# `multer-cloudflare-storage`

[![GitHub](https://img.shields.io/github/license/zaida04/multer-cloudflare-storage)](https://github.com/zaida04/multer-cloudflare-storage/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/multer-cloudflare-storage?color=crimson&logo=npm)](https://www.npmjs.com/package/multer-cloudflare-storage)
[![CI workflows](https://github.com/zaida04/multer-cloudflare-storage/actions/workflows/ci.yml/badge.svg)](https://github.com/zaida04/multer-cloudflare-storage/actions/workflows/ci.yml)

## 📥 Installation

You can install this package from [NPM](https://www.npmjs.com/package/multer-cloudflare-storage)

-   `npm install multer-cloudflare-storage`
-   `yarn add multer-cloudflare-storage`

## ⚡ Usage

```typescript
import express, { Request, Response } from "express";
import multer from "multer";
import { CloudflareStorage } from "multer-cloudflare-storage";

const app = express();
const uploader = multer({
    storage: new CloudflareStorage("YOUR_CLOUDFLARE_ACCOUNT_ID_HERE", "YOUR_CLOUDFLARE_ACCOUNT_TOKEN_HERE")
});

app.post("/", uploader.single("image"), (req: Request, _res: Response) => {
    console.log(req.file);
    // {
    //     fieldname: 'image',
    //     originalname: 'PLACEHOLDER_IMAGE_NAME.jiff',
    //     encoding: '7bit',
    //     mimetype: 'application/octet-stream',
    //     path: 'https://imagedelivery.net/PLACEHOLDER_ACCOUNT_ID/PLACEHOLDER_IMAGE_ID/public',
    //     filename: null,
    //     destination: 'PLACEHOLDER_IMAGE_ID'
    // }
});
```

You can find a working example of an Express server with multer and this package [here](https://github.com/zaida04/multer-cloudflare-storage/blob/main/example/src/index.ts)

## ✋ Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please ensure any and all commits pass our tests, linting, and build steps as described in the root package.json.

## ⚖️ LICENSE

Licensed under the [MIT License](https://github.com/zaida04/multer-cloudflare-storage/blob/main/LICENSE)
