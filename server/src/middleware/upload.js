import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../config/cloudinary.js'

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "nursery",          // cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "webp", "avif", "svg", "ico", "gif"],
    public_id: (req, file) => 
      `${Date.now()}-${file.originalname
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-_\.]/g, "")}`
  },
});

const upload = multer({ storage });

export default upload;

// UPLOAD
// router.post("/upload", upload.single("image"), (req, res) => 
// router.post("/upload-multiple", upload.array("images", 5), (req, res) =>     5 is maximum limit of files
  
// DELETE
// const result = await cloudinary.uploader.destroy(public_id);