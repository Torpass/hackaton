import path from 'path';
import multer from 'multer';

const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000';
const date = new Date()
const fullDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../storage/history'));
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    const filename = `${req.body.id}-${fullDate}.${ext}`;
    const url = `${PUBLIC_URL}/history/${filename}`;
    req.body.images = req.body.images || []; 
    req.body.images.push(url); 
    cb(null, filename);
  }
});

const upload = multer({ 
  storage, 
  limits:{ fieldSize: 1000000}, 
  fileFilter(_req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

export default upload;

