// import { RNS3 } from 'react-native-aws3'
import AWS from "aws-sdk";
import { S3 } from "../Services/S3";

export const uploadImage = (file, folder) => {
  return new Promise((resolve) => {
    const fileName = `${new Date().getTime().toString()}.png`;
    AWS.config.update({
      accessKeyId: S3.accessKeyId,
      secretAccessKey: S3.secretAccessKey,
    });
    const s3 = new AWS.S3({
      params: { Bucket: `meemint` },
      region: "eu-south-1",
    });

    const params = {
      // ACL: "public-read",
      Bucket: "meemint",
      dirName: folder,
      Key: `${folder}/${fileName}`,
      Body: file,
      ContentType: "image/png",
    };

    s3.upload(params, (err, data) => {
      if (err) {
        // setIsLoading(false)
        console.log("ERR :: ", err);
        resolve({ status: 401 });
      }
      if (data) {
        console.log("data ::", data);
        resolve({ status: 201, data: data });
      } else {
        resolve({ status: 401 });
      }
    });
  });
};

export const deleteImage = (key) => {
  AWS.config.update({
    accessKeyId: S3.accessKeyId,
    secretAccessKey: S3.secretAccessKey,
  });
  const s3 = new AWS.S3({
    params: { Bucket: "meemint" },
    region: "us-east-2",
  });

  s3.deleteObject(
    {
      Bucket: MY_BUCKET,
      Key: key,
    },
    function (err, data) {
      if (err) {
        return {
          success: false,
        };
      } else {
        return {
          success: true,
        };
      }
    }
  );
};
