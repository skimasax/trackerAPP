const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadImage = async (req, res, folderName) => {
  const image = req.files?.image;
  const maxSize = 10 * 1024 * 1024; // 10MB

  try {
    if (!image) {
      throw new Error("Please upload an image");
    }

    if (image.size > maxSize) {
      throw new Error(`Image must not exceed ${maxSize / (1024 * 1024)}MB`);
    }

    if (!image.mimetype.startsWith("image")) {
      throw new Error("You can only upload an image file");
    }

    const uploadedImage = await cloudinary.uploader.upload(image.tempFilePath, {
      use_filename: true,
      folder: folderName,
    });

    

    // Clean up the temporary file
    fs.unlinkSync(image.tempFilePath);

    return {
      public_id: uploadedImage.public_id,
      secure_url: uploadedImage.secure_url,
    };
  } catch (error) {
    throw new Error(error.message); // Throw the error message instead of the entire error object
  }
};

const deleteImage = async(id) => {
  try {
    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(id);

    if (result.result === 'ok') {
     return 'Image deleted successfully';
    } else {
      throw new Error("Image not found");
    }
  } catch (error) {
    throw new Error("Error occurred while deleting image");
  }
  
}

module.exports = {uploadImage,deleteImage};
