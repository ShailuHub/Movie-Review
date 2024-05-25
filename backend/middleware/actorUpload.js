import multer from "multer";

// Create storage
const storage = multer.diskStorage({});

// Filtering function for incominf file
const fileFilter = (req, file, next) => {
  if (!file.mimetype.startsWith("image")) {
    next("Please uplaod only image file", false);
  }
  next(null, true);
};
const uploadImage = multer({ storage, fileFilter });

export default uploadImage;
