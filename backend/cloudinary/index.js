import * as dotenv from "dotenv";

if (process.env.NODE_ENV != "Production") {
  dotenv.config();
}
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eLibrary",
    allowedFormats: ["pdf"],
  },
});

export { cloudinary, storage };
