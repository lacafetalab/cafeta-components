export class UploadAdapter {
    constructor({ loader, serviceUpload }) {
        this.loader = loader;
        this.serviceUpload = serviceUpload;
    }
    async upload() {
        const file = await this.loader.file;
        try {
            const imageUrl = await this.serviceUpload(file);
            return {
                default: imageUrl
            };
        }
        catch (e) {
            throw e;
        }
    }
}
