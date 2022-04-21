import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const S3 = {
  accessKeyId: publicRuntimeConfig.NEXT_AWS_ACCESS_KEY,
  secretAccessKey: publicRuntimeConfig.NEXT_AWS_SECRET_KEY,
};

export default S3;
