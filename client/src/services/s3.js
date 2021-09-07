import S3FileUpload from 'react-s3'

const config = {
  bucketName: "fishermanstales",
  region: "us-east-2",
  accessKeyId: "AKIAY2X3TVTP4MRWCVFX",
  secretAccessKey: "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",
};

async function uploadImage(image) {
  let uploadedImage = await S3FileUpload.uploadFile(image, config)
  return uploadedImage
};

export { uploadImage }