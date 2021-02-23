export declare class UploadAdapter {
    loader: any;
    serviceUpload: (file: any) => Promise<string>;
    server: any;
    constructor({ loader, serviceUpload }: {
        loader: any;
        serviceUpload: any;
    });
    upload(): Promise<{
        default: string;
    }>;
}
