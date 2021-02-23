export class UploadAdapter {
    constructor({ loader, serviceUpload }) {
        this.loader = loader;
        this.serviceUpload = serviceUpload;
    }
    async upload() {
        const file = await this.loader.file;
        const fakeProgress = {
            total: 100,
            init: 0
        };
        this.loader.uploadTotal = fakeProgress.total;
        this.loader.uploaded = fakeProgress.init;
        try {
            const imageUrl = await this.serviceUpload(file);
            this.loader.uploaded = fakeProgress.total;
            return {
                default: imageUrl
            };
        }
        catch (e) {
            throw e;
        }
    }
}
