import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'dhnhrrike',
  api_key: '134921294962365',
  api_secret: '6zfi6a8O7xbm-qv-kxo_dkNQS4I',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'user-profile-images',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
      public_id: `${Date.now()}-${file.originalname}`, // optional: control filename
    };
  },
});

const upload = multer({ storage });

export default upload;
