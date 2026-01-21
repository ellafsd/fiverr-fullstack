import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import type { NextFunction } from "express";
import { config } from "../config/environment.js";
import e from "../utils/error.js";

dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUD_API_KEY,
  api_secret: config.CLOUD_SECRET,
});

// Upload an image
const upload = async (
  next: NextFunction,
  file_path: string,
  folder: string,
  width?: number,
  height?: number,
  crop?: string,
  quality?: string,
  type: "image" | "video" | "raw" | "auto" | undefined = "auto"
) => {
  try {
    const result = await cloudinary.uploader.upload(file_path, {
      folder,           // ← Bu folder parametresi önemli
      resource_type: type,
      width,
      height,
      crop,
      quality,
    });
    return result;
  } catch (err) {
    next(e(400, "Fotoğraf yüklenemedi"));
    throw err;
  }
};

export default upload;





// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// import type { NextFunction } from "express";
// import { config } from "../config/environment.js";
// import e from "../utils/error.js"

// dotenv.config();

// // Configuration
// cloudinary.config({
//   cloud_name: config.CLOUD_NAME,
//   api_key: config.CLOUD_API_KEY,
//   api_secret: config.CLOUD_SECRET,
// });

// // Upload an image
// const upload = async (
//   next: NextFunction,
//   file_path: string,
//   folder: string,
//   width?: number,
//   height?: number,
//   crop?: string,
//   quality?: string,
//   type: "image" | "video" | "raw" | "auto" | undefined = "auto"
// ) => {
//   return await cloudinary.uploader.upload(
//     file_path,
//     {
//       folder,
//       resource_type: type,
//       width,
//       height,
//       crop,
//       quality,
//     },
//  (err) => {
//       if (err) return next(e(400, "Fotoğraf yüklenemedi"));
//     }
//   );
// };

// export default upload;