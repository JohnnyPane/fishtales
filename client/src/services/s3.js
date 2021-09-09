import S3FileUpload from "react-s3";
require("dotenv").config();

const config = {
  bucketName: "fishtales",
  region: "us-east-2",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};


async function uploadImage(image) {
  let uploadedImage = await S3FileUpload.uploadFile(image, config);
  return uploadedImage;
}

export { uploadImage };
