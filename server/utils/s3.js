const fs = require("fs");
const AWS = require("aws-sdk");

async function s3Upload(fileName) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: "fishermanstales",
    Key: "key",
    Body: stream,
  };
  s3.upload(params, function (err, data) {
    console.log(err, data);
  });

  const uploadFile = (fileName) => {
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      const params = {
        Bucket: "fishermanstales", // pass your bucket name
        Key: fileName, // file will be saved as testBucket/contacts.csv
        Body: JSON.stringify(data, null, 2),
      };
      s3.upload(params, function (s3Err, data) {
        if (s3Err) throw s3Err;
        console.log(`File uploaded successfully at ${data.Location}`);
      });
    });
  };

  uploadFile();
}

exports.s3Upload = s3Upload