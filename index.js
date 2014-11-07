var s3 = require('s3');
var RSVP = require('rsvp');

var client = s3.createClient({
  maxAsyncS3: 1,
  s3Options: {
    accessKeyId: "<your key here>",
    secretAccessKey: "<your secret here>"
  }
});

var uploadParams = {
  localDir: 'assets',
  s3Params: {
    ACL: 'public-read',
    Bucket: '<your bucket name>',
    Prefix: 'assets/',
  }
};

var uploadToS3 = function() {
  return new RSVP.Promise(function(resolve, reject) {
    var uploader = client.uploadDir(uploadParams);

    uploader.on('end', function() {
      console.log('end');
      resolve();
    });

    uploader.on('fileUploadEnd', function(localFilePath, s3Key) {
      console.log('fileUploadEnd: ' + localFilePath);
    });
  });
};

uploadToS3()
  .then(function() {
    console.log('then from promise');
  });
