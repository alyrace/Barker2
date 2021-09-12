const AWS = require('aws-sdk');
const config = require('config');

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: config.get('awsAccessKeyID'),
  secretAccessKey: config.get('awsSecretAccessKey'),
});

// create S3 instance
const s3 = new AWS.S3();

function uploadFile(buffer, name, type) {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: config.get('S3_BUCKET'),
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
}

module.exports = uploadFile;