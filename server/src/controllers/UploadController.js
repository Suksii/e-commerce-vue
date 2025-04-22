import fs from "fs";

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const { path, originalname } = req.file;
    const extension = originalname.split(".").pop();
    const newPath = path + "." + extension;

    fs.renameSync(path, newPath);
    res.status(200).send(newPath.split("\\").slice(1));
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const { path, originalname } = req.files[0];
    const extension = originalname.split(".").pop();
    const newPath = path + "." + extension;

    fs.renameSync(path, newPath);
    res.status(200).send(newPath.split("\\").slice(1));
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
