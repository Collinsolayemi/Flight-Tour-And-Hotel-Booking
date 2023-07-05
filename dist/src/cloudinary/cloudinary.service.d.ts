import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadImage(file: any): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
