console.log("Process ::", process.env.NEXT_AWS_ACCESS_KEY);
const S3 = {
  accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AWS_SECRET_KEY,
};

export default S3;
