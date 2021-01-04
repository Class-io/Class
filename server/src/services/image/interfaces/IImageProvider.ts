export interface IImageProvider {
    uploadImage(): Promise<void>;
}