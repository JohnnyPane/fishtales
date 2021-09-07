import S3FileUpload from "react-s3";

const config = {
  bucketName: "fishermanstales",
  region: "us-east-2",
};

async function uploadImage(image) {
  let uploadedImage = await S3FileUpload.uploadFile(image, config);
  return uploadedImage;
}

export { uploadImage };
