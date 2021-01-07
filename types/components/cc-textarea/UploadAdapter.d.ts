export declare class UploadAdapter {
    loader: any;
    serviceUpload: (file: any) => Promise<string>;
    constructor({ loader, serviceUpload }: {
        loader: any;
        serviceUpload: any;
    });
    upload(): Promise<{
        default: string;
    }>;
}
