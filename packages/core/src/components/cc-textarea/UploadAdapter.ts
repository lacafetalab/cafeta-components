export class UploadAdapter {
  loader: any;
  serviceUpload: (file: any) => Promise<string>;

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
    } catch {
      throw new Error(`Couldn't upload file: ${file.name}.`);
    }
  }
}
