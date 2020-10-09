import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFolder = path.resolve(tmpFolder, 'uploads');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  config: {
    disk: {
      storage: StorageEngine;
    };
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  tmpFolder,
  uploadsFolder,
  config: {
    disk: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename(req, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('HEX');
          const filename = `${fileHash}-${file.originalname}`;

          return callback(null, filename);
        },
      }),
    },
    aws: {
      bucket: process.env.AWS_S3_BUCKET || 'app-gobarber',
    },
  },
} as IUploadConfig;
