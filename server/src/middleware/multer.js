import multer from "multer";

export const photoUpload = multer({ storage: multer.memoryStorage() });
