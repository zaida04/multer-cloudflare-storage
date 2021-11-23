export interface CloudflareCDNUploadResponse<T = string[]> {
    success: boolean;
    errors: {
        code: number;
        message: string;
    }[];
    result: {
        id: string;
        filename: string;
        metadata: {
            meta: string;
        };
        requireSignedURLs: boolean;
        variants: T;
        uploaded: string;
    };
}
