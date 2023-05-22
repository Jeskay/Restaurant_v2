import {UploadApiErrorResponse, UploadApiOptions, UploadApiResponse, v2 as cloudinary, v2} from 'cloudinary';
import {createReadStream} from 'streamifier'

export class CloudinaryService {
    private folder: string;

    constructor() {
        this.folder = process.env.CLOUD_FOLDER_NAME || 'restaurant';
        v2.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
    }

    async uploadImage(buffer: string | Buffer | Uint8Array) {
        const streamUpload = function(options?: UploadApiOptions): Promise<UploadApiResponse | UploadApiErrorResponse> {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  options,
                  (error, result) => {
                    if (result) {
                      return resolve(result);
                    } else {
                      return reject(error);
                    }
                  }
                );
              createReadStream(buffer).pipe(stream);
            });
        };
        
        const uploadedImage = await streamUpload({
          folder: this.folder
        });
        return uploadedImage.secure_url;
    }

    async updateImage( newImage: string | Buffer | Uint8Array, oldUrl?: string | null) {
      if(oldUrl) {
        await this.deleteImage(oldUrl);
      }
      return await this.uploadImage(newImage);
    }

    async deleteImage(url: string ) {
      const filename = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'))
      await cloudinary.uploader.destroy(filename, (err, response) => {
        if (err) {
          console.error(response + ' Delete image from cloudinary')
        } else
          console.log(response.result + ' Storage clearance')
      })
    }
}