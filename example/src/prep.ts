import { config } from "dotenv";
import { join } from "path";
config({
    "path": join(__dirname, "..", "..", ".env")
})

const missingKeys: string[] = [];
for (const envKey of ["CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_TOKEN"]) {
    if (!process.env[envKey]) missingKeys.push(envKey);
}
if (missingKeys.length) throw new Error(`Missing required env variable${missingKeys.length > 1 ? "s" : ""}: ${missingKeys.join(", ")}.`);
