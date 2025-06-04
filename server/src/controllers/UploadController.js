import fs from "fs";
import cloudinary from "../../config/cloudinary.js";

// export const uploadImage = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
//   try {
//     const { path, originalname } = req.file;
//     const extension = originalname.split(".").pop();
//     const newPath = path + "." + extension;

//     fs.renameSync(path, newPath);
//     res.status(200).send(newPath.split("\\").slice(1));
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// };

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const folder = req.query.folder || "general";

  try {
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await streamUpload();

    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ message: "Image upload failed", error });
  }
};

// export const uploadImages = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No files uploaded" });
//     }
//     const { path, originalname } = req.files[0];
//     const extension = originalname.split(".").pop();
//     const newPath = path + "." + extension;

//     fs.renameSync(path, newPath);
//     res.status(200).send(newPath.split("\\").slice(1));
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// };

export const uploadImages = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const folder = req.query.folder || "general";

  try {
    const uploadSingle = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(file.buffer);
      });
    };

    const uploadResults = await Promise.all(
      req.files.map((file) => uploadSingle(file))
    );

    const response = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Images upload failed", error });
  }
};
