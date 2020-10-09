import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const destinationFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: destinationFolder,
  storage: multer.diskStorage({
    destination: destinationFolder,
    filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
